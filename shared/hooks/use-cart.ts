import React from 'react'

import { CartStateItem } from '../lib/get-cart-details'
import { CreateCartItemValues } from '../services/dto/cart.dto'
import { useCartStore } from '../store'

type ReturnProps = {
	totalAmount: number
	items: CartStateItem[]
	loading: boolean
	updateItemQuantity: (id: number, quantity: number) => void
	removeCartItem: (id: number) => void
	addCartItem: (values: CreateCartItemValues) => void
}

// 16:13:00 
export const useCart = (): ReturnProps => {
	const cartState = useCartStore((state: any) => state)

	React.useEffect(() => {
		cartState.fetchCartItems()
	}, [])

	return cartState
}
