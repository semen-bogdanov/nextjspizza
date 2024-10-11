import { useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import { useSet } from 'react-use'

// 6:24:00 - фильтрация ползунка price
interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

interface QueryFilters extends PriceProps {
	pizzaTypes: string
	sizes: string
	ingredients: string
}

export interface Filters {
	pizzaTypes: Set<string>
	sizes: Set<string>
	selectedIngredients: Set<string>
	prices: PriceProps
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void
	setPizzaTypes: (value: string) => void
	setSizes: (value: string) => void
	setSelectedIngredients: (value: string) => void
	// setIngredients: (value: string) => void
}

// хук работает только с фильтрацией
export const useFilters = (): ReturnProps => {
	const router = useRouter()
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>

	// Фильтр ингредиентов
	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(','))
	)

	// const { items, loading, onAddId, selectedIgredients } = useFilterIngredients(
	// 	searchParams.get('ingredients')?.split(',')
	// )

	// вшивание в URL значений из фильтрации "Размеры"
	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
		)
	)

	// вшивание в URL значений из фильтрации "Тип теста" 6:53:00
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(
			searchParams.has('pizzaTypes')
				? searchParams.get('pizzaTypes')?.split(',')
				: []
		)
	)

	// вшивание в URL значений из ползунка 0 - 1000
	const [prices, setPrices] = React.useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	})

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices(prev => ({
			...prev,
			[name]: value,
		}))
	}

	return useMemo(() => ({
		sizes,
		pizzaTypes,
		selectedIngredients,
		prices,
		setPrices: updatePrice,
		setPizzaTypes: togglePizzaTypes,
		setSizes: toggleSizes,
		setSelectedIngredients: toggleIngredients,
	}), [sizes, pizzaTypes, selectedIngredients, prices])
}
