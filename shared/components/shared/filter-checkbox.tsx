import React from 'react'
import { Checkbox } from '../ui/checkbox'

export interface FilterChecboxProps {
	text: string
	value: string
	endAdornment?: React.ReactNode // библиотечная UI элемент. Можно прописать дополнительный jsx.
	onCheckedChange?: (checked: boolean) => void // true или false каждый раз при клике.
	checked?: boolean
	name?: string
}

// 1:07:00 создание фильтрации
export const FilterCheckbox: React.FC<FilterChecboxProps> = ({
	text,
	value,
	endAdornment,
	onCheckedChange,
	checked,
	name,
}) => {
	return (
		<div className='flex items-center space-x-2'>
			<Checkbox
				onCheckedChange={onCheckedChange}
				checked={checked}
				value={value}
				className='rounded-[8px] w-6 h-6'
				id={`checkbox-${String(name)}-checkbox-${String(value)}`}
			/>
			<label
				htmlFor={`checkbox-${String(name)}-checkbox-${String(value)}`}
				className='leading-none cursor-pointer flex-1'
			>
				{text}
			</label>
			{endAdornment}
		</div>
	)
}
