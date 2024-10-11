'use server'

import { prisma } from '@/prisma/prisma-client'
import { PayOrderTemplate } from '@/shared/components/shared/email-temapltes'
import { VerificationUserTemplate } from '@/shared/components/shared/email-temapltes/verification-user'
import { CheckoutFormValues } from '@/shared/constants'
import { createPayment, sendEmail } from '@/shared/lib'
import { getUserSession } from '@/shared/lib/get-user-session'
import { OrderStatus, Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { cookies } from 'next/headers'

// 17:47:00 Серверный экшен
export async function createOrder(data: CheckoutFormValues) {
	try {
		// 18:06:00
		const cookieStore = cookies()
		const cartToken = cookieStore.get('cartToken')?.value
		if (!cartToken) {
			throw new Error('Токен корзины не найден')
		}
		/* Находим корзину по токену */
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		})
		/* Если корзина не найдена возращаем ошибку */
		if (!userCart) {
			throw new Error('Корзина не найдена')
		}
		/* Если корзина пустая возращаем ошибку */
		if (userCart?.totalAmount === 0) {
			throw new Error('Корзина пуста')
		}

		//const user = await getUserSession() // Получаем информацию о текущем пользователе

		// if (!user) {
		// 	throw new Error('Пользователь не найден')
		// }

		/* Создаем заказ */
		const order = await prisma.order.create({
			data: {
				token: cartToken, //
				fullName: data.firstName + ' ' + data.lastName, //
				email: data.email, //
				phone: data.phone, //
				address: data.address, //
				comment: data.comment, //
				totalAmount: userCart.totalAmount, //
				status: OrderStatus.PENDING, //
				items: JSON.stringify(userCart.items), //
				//		userId, // Добавляем userId в объект data
			},
		})

		/* Очищаем корзину */
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		})

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		})

		/* Оплата */
		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: 'Оплата заказа #' + order.id,
		})

		if (!paymentData) {
			throw new Error('Платежные данные не найдены')
		}
		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		})
		const paymentUrl = paymentData.confirmation.confirmation_url

		/* Отправка письма на почту. Поттверждение */
		await sendEmail(
			data.email,
			'Next Pizza / Оплатите заказ #' + order.id,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl,
			}),
		)
		return paymentUrl
	} catch (err) {
		console.log('[CreateOrder] Server error', err)
	}
}
// 21:35:00
export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession()
		if (!currentUser) {
			throw new Error('Пользователь не найден')
		}
		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		})
		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
			},
		})
	} catch (err) {
		console.log('Error [UPDATE_USER]', err)
		throw err
	}
}
// 21:43:00
export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		})
		if (user) {
			if (!user.verified) {
				throw new Error('Почта не подтверждена')
			}
			throw new Error('Пользователь уже существует')
		}
		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
			},
		})
		const code = Math.floor(100000 + Math.random() * 900000).toString() // utythfwbz rjlf
		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		})
		await sendEmail(
			createdUser.email,
			'Next Pizza / 📝 Подтверждение регистрации',
			VerificationUserTemplate({
				code,
			}),
		)
	} catch (err) {
		console.log('Error [CREATE_USER]', err)
		throw err
	}
}
