import { Ingredient, ProductItem } from '@prisma/client'
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza'
import { calcTotalPizzaPrice } from './calc-total-pizza-price'

// 10:24:00
export const getPizzaDetails = (
	type: PizzaType,
	size: PizzaSize,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const totalPrice = calcTotalPizzaPrice(
		type,
		size,
		items,
		ingredients,
		selectedIngredients
	)
	const textDetaills = `${size} см, ${mapPizzaType[type]} пицца`

	return { totalPrice, textDetaills }
}
