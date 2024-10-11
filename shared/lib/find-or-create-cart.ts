import { prisma } from '@/prisma/prisma-client'

//12:30:00
export const findOrCreateCart = async (token: string) => {
	let userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
	})

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
				token,
			},
		})
	}

	return userCart
}
