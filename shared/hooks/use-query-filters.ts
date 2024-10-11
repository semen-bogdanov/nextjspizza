import { useRouter } from 'next/navigation'
import qs from 'qs'
import React from 'react'
import { Filters } from './use-filters'

export const useQueryFilters = (filters: Filters) => {
	const isMounted = React.useRef(false)
	const router = useRouter()
	React.useEffect(() => {
		if (isMounted.current) {
			// 6:38:00
			const params = {
				...filters.prices,
				pizzaTypes: Array.from(filters.pizzaTypes),
				sizes: Array.from(filters.sizes),
				ingredients: Array.from(filters.selectedIngredients),
			}

			const query = qs.stringify(params, {
				arrayFormat: 'comma',
			})
			router.push(`?${query}`, {
				scroll: false, // 6:47:30 - чтобы подергивания не было
			})
			console.log(filters, 999)
		}
		isMounted.current = true
	}, [filters])
}
