'use client'
import { ProductWithRelations } from '@/@types/prisma'

import { useCartStore } from '@/shared/store'
import React from 'react'
import toast from 'react-hot-toast'
import { ChoosePizzaForm, ChooseProductForm } from './index'

interface Props {
	product: ProductWithRelations
	onSubmit?: VoidFunction
}

// 14:45:00
export const ProductForm: React.FC<Props> = ({
	product,
	onSubmit: _onSubmit,
}) => {
	const [addCartItem, loading] = useCartStore((state: any) => [
		state.addCartItem,
		state.loading,
	])

	const firstItem = product.items[0]
	const isPizzaForm = Boolean(firstItem.pizzaType)

	//13:30:00
	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id

			await addCartItem({
				productItemId: itemId,
				ingredients,
			})

			toast.success(product.name + ' добавлена в корзину')

			_onSubmit?.()
		} catch (err) {
			toast.error('Не удалось добавить товар в корзину')
			console.error(err)
		}
	}

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.items}
				onSubmit={onSubmit}
				loading={loading}
			/>
		)
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			onSubmit={onSubmit}
			price={firstItem.price}
			loading={loading}
		/>
	)
}
