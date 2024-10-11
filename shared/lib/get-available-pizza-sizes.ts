import { ProductItem } from '@prisma/client'
import { Variant } from '../components/shared/group-variants'
import { PizzaType, pizzaSizes } from '../constants/pizza'

export const getAvailablePizzaSizes = (
	type: PizzaType,
	items: ProductItem[]
): Variant[] => {
	const filteredPizzasByType = items.filter(item => item.pizzaType === type)
	// 9:48:00 далее 10:13:00
	return pizzaSizes.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType.some(
			pizza => Number(pizza.size) === Number(item.value)
		),
	}))
}
