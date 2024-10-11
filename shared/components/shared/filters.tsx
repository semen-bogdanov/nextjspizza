'use client'

import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Input, RangeSlider } from '../ui'
import { CheckboxFiltersGroup, Title } from './index'

interface Props {
	className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
	const router = useRouter()
	const { items, loading } = useIngredients()
	const filters = useFilters()
	useQueryFilters(filters)
	// const [prices, setPrice] = React.useState<PriceProps>({
	// 	priceFrom: 0,
	// 	priceTo: 1000,
	// }) //! Объект из двух значений

	const itemsNew = items.map(item => ({
		value: String(item.id),
		text: item.name,
	}))

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0])
		filters.setPrices('priceTo', prices[1])
	}

	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />
			{/* Верхние чекбоксы */}
			<CheckboxFiltersGroup
				title='Тип теста'
				className='mb-5'
				name='pizzaTypes'
				onClickCheckbox={filters.setPizzaTypes}
				selected1={filters.pizzaTypes}
				items={[
					{ text: 'Тонкое', value: '2' },
					{ text: 'Традиционное', value: '1' },
				]}
			/>
			<CheckboxFiltersGroup
				className='mb-5'
				title='Размеры'
				name='sizes'
				onClickCheckbox={filters.setSizes}
				selected1={filters.sizes}
				items={[
					{ text: '20см', value: '20' },
					{ text: '30см', value: '30' },
					{ text: '40см', value: '40' },
				]}
			/>
			{/* <div className='flex flex-col gap-4'>
				<FilterCheckbox name='' text='Можно собирать' value='1' />
				<FilterCheckbox name='' text='Новинки' value='2' />
			</div> */}

			{/* Фильтр цен */}
			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={1000}
						value={String(filters.prices.priceFrom)}
						onChange={e =>
							filters.setPrices('priceFrom', Number(e.target.value))
						}
					/>
					<Input
						type='number'
						min={100}
						max={1000}
						placeholder='1000'
						value={String(filters.prices.priceTo)}
						onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>
				{/* 6:28:00 */}
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[
						filters.prices.priceFrom || 0,
						filters.prices.priceTo || 1000,
					]}
					onValueChange={updatePrices}
				/>
			</div>
			<CheckboxFiltersGroup
				className='mt-5'
				title='Ингредиенты'
				name='ingredients'
				limit={6}
				defaultItems={itemsNew.slice(0, 6)}
				items={itemsNew}
				loading={loading}
				onClickCheckbox={filters.setSelectedIngredients}
				selected1={filters.selectedIngredients}
			/>
		</div>
	)
}
