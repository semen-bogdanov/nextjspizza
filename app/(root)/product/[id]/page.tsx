import { prisma } from '@/prisma/prisma-client'
import { Container, ProductForm } from '@/shared/components/shared'
import { notFound } from 'next/navigation'


export default async function ProductPage({
	params: { id },
}: {
	params: { id: string }
}) {
	// 14:36:00
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							items: true,
						},
					},
				},
			},
			items: true,
		},
	})

	if (!product) {
		return notFound()
	}

	return (
		<Container className='flex flex-col my-10'>
			<ProductForm product={product} />
		</Container>
	)
}
