import { prisma } from '@/prisma/prisma-client'
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart'
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount'
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto'
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

//11:14:00. Реализация товара в корзину и прочие функции
export async function GET(req: NextRequest) {
	try {
		// взять токен. Будет сохраняться в cookies
		const token = req.cookies.get('cartToken')?.value

		// запрос на получение карзины
		if (!token) {
			// если токена нету, то возвращаеться пустая корзина и totalAmount -
			return NextResponse.json({ totalAmount: 0, items: [] })
		}

		// Реализация корзины 11:17:00
		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					// проверка на наличие токена
					{
						token,
					},
				],
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc', // отсортируй свои товары
					},
					include: {
						productItem: {
							// вместе с items верни productItem (информацию о самом продукте)
							include: {
								product: true,
							},
						},
						ingredients: true, // ингредиенты пиццы (какие ингредиенты решил добавить)
					},
				},
			},
		})
		// console.log(userCart)

		return NextResponse.json(userCart)
	} catch (error) {
		console.log('[CART_GET] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось получить корзину' },
			{ status: 500 }
		)
	}
}

// 12:27:00
export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value

		if (!token) {
			token = crypto.randomUUID()
		}

		const userCart = await findOrCreateCart(token)

		const data = (await req.json()) as CreateCartItemValues

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				ingredients: {
					every: {
						id: { in: data.ingredients },
					}

				},
			},
		})

		console.log(data.ingredients)
		// console.log(
		// 	data.ingredients !== undefined
		// 		? data.ingredients.length == 0
		// 		: `не работает`
		// )
		// Если товар был найден, делаем +1

		// if (ing1.length !== data.ingredients.length) {
		// 	return false
		// }

		if (
			findCartItem &&
			data.ingredients !== undefined &&
			data.ingredients.length === 0
		) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			})
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId: data.productItemId,
					quantity: 1,
					ingredients: { connect: data.ingredients?.map(id => ({ id })) },
				},
			})
		}

		const updatedUserCart = await updateCartTotalAmount(token)

		const resp = NextResponse.json(updatedUserCart)
		resp.cookies.set('cartToken', token)
		return resp
	} catch (error) {
		console.log('[CART_POST] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 }
		)
	}
}
