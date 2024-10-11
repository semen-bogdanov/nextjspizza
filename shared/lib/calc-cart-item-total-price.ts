import { CartItemDTO } from '../services/dto/cart.dto'

// 11:43:00
export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
	const ingredientsPrice = item.ingredients.reduce(
		(acc, ingredient) => acc + ingredient.price,
		0
	)

	return (ingredientsPrice + item.productItem.price) * item.quantity
}
