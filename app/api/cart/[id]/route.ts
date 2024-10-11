import { prisma } from '@/prisma/prisma-client'
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount'
import { NextRequest, NextResponse } from 'next/server'

// 11:55:00
export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = Number(params.id)
		const data = (await req.json()) as { quantity: number }
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'Токен корзины не найден' })
		}

		// Если token есть, то найди cartItem, который c id
		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id,
			},
		})

		// если товар не нашёлся то...
		if (!cartItem) {
			return NextResponse.json({ error: 'Товар в корзине не найден' })
		}

		await prisma.cartItem.update({
			where: {
				id,
			},
			data: {
				quantity: data.quantity,
			},
		})

		const updatedUserCart = await updateCartTotalAmount(token)

		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_PATCH] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось обновить корзину' },
			{ status: 500 }
		)
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = Number(params.id)
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'Токен корзины не найден' })
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(params.id),
			},
		})

		if (!cartItem) {
			return NextResponse.json({ error: 'Товар в корзине не найден' })
		}

		await prisma.cartItem.delete({
			where: {
				id: Number(params.id),
			},
		})

		const updatedUserCart = await updateCartTotalAmount(token)

		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_DELETE] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось удалить корзину' },
			{ status: 500 }
		)
	}
}
