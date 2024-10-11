'use client'

import { ProductWithRelations } from '@/@types/prisma'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { cn } from '@/shared/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ProductForm } from '../product-form'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()
	// const firstItem = product.items[0]
	// const isPizzaForm = Boolean(firstItem.pizzaType)
	// const addCartItem = useCartStore(state => state.addCartItem)

	// const onAddProduct = () => {
	// 	addCartItem({
	// 		productItemId: firstItem.id,
	// 	})
	// }

	// const onAddPizza = (productItemId: number, ingredients: number[]) => {}

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			{/* <DialogTitle>Заголовок диалогового окна</DialogTitle> */}
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}
			>
				<ProductForm product={product} onSubmit={() => router.back()} />
			</DialogContent>
		</Dialog>
	)
}
