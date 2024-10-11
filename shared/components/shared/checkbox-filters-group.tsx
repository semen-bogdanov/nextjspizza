'use client'

import React from 'react'
import { useSet } from 'react-use' // 2:09:00

import { Input, Skeleton } from '../ui/index'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox'

type Item = FilterChecboxProps

interface Props {
	title: string
	items: Item[]
	defaultItems?: Item[]
	limit?: number
	loading?: boolean
	searchInputPlaceholder?: string
	className?: string
	onClickCheckbox?: (id: string) => void
	defaultValue?: string[]
	selected1?: any
	name?: string
}

// 1:20:00 Создание списка чекбоксов
export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	className,
	loading,
	onClickCheckbox,
	selected1,
	name,
	defaultValue,
}) => {
	const [showAll, setShowAll] = React.useState(false)
	const [selected, { add, toggle }] = useSet<string>(new Set([]))
	const [searchValue, setSearchValue] = React.useState('')

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	// const onCheckedChange = (value: string) => {
	// 	toggle(value)
	// }

	React.useEffect(() => {
		if (defaultValue) {
			defaultValue.forEach(add)
		}
	}, [defaultValue?.length, selected1])

	// React.useEffect(() => {
	// 	onChange?.(Array.from(selected))
	// }, [selected])

	if (loading) {
		return (
			<div className={className}>
				<p className='font-bold mb-3'>{title}</p>
				{...Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
					))}
				<Skeleton className='w-28 h-6 mb-4 rounded-[8px]' />
			</div>
		)
	}

	const list: any =
		showAll && items !== undefined
			? items.filter(item =>
					item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
			  )
			: (defaultItems || items).slice(0, limit)

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{/* Если showAll - true, то input показывается */}
			{showAll && (
				<div className='mb-5'>
					<Input
						onChange={onChangeInput}
						placeholder={searchInputPlaceholder}
						className='bg-gray-50 border-none'
					/>
				</div>
			)}

			{/* Список чекбоксов */}
			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{(showAll ? list : defaultItems || list).map(
					(item: any, index: number) => (
						<FilterCheckbox
							// onCheckedChange={() => onCheckedChange(item.value)}
							checked={selected1?.has(item.value)}
							key={index}
							value={item.value}
							text={item.text}
							endAdornment={item.endAdornment}
							onCheckedChange={() => onClickCheckbox?.(item.value)}
							name={name}
						/>
					)
				)}
			</div>

			{/* Кнопка показать всё 1:46:30*/}
			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						onClick={() => setShowAll(!showAll)}
						className='text-primary mt-3'
					>
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}
		</div>
	)
}
