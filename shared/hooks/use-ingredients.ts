import { Ingredient } from '@prisma/client'
import React from 'react'
import { Api } from '../services/api-client'

export const useIngredients = () => {
	const [items, seItems] = React.useState<Ingredient[]>([])
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		async function fetchgetIngredients() {
			try {
				setLoading(true)
				const ingredients = await Api.ingredients.getAll()
				seItems(ingredients)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		fetchgetIngredients()
	}, [])

	return {
		items,
		loading,
	}
}
