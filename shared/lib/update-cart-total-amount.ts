import { prisma } from '@/prisma/prisma-client'
import { calcCartItemTotalPrice } from './calc-cart-item-total-price'

// 12:02:00 - обновление карзины с помощью prisma
export const updateCartTotalAmount = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	})

	if (!userCart) {
		return
	}

	const totalAmount = userCart.items.reduce((acc: any, item: any) => {
		return acc + calcCartItemTotalPrice(item) // калькуляция, общая стоимость всех товаров
	}, 0)

	return await prisma.cart.update({
		where: {
			id: userCart.id,
		},
		data: {
			totalAmount,
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	})
}
