import { cn } from '@/shared/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui'
import { CountButton, Title } from './'
import { Ingredient } from '@prisma/client'

interface Props {
	id: number
	name: string
	price: number
	count?: number
	imageUrl?: string
	ingredients: Ingredient[]
	className?: string
}

// Полностью карточка товара
export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	count,
	imageUrl,
	ingredients,
	className,
}) => {
	return (
		<div className={cn(className)}>
			<Link href={`/product/${id}`}>
				{/* Картинка пиццы */}
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
					<img className='w-[215px] h-[215px]' src={imageUrl} alt='Logo' />
				</div>
			</Link>
			<Title text={name} size='sm' className='mb-1 mt-3 font-bold' />
			<p className='text-sm text-gray-400'>
				{
					ingredients.map((ingredient) =>
						ingredient.name).join(', ')
				}
			</p>

			<div className='flex justify-between items-center mt-4'>
				<span className='text-[20px]'>
					от <b>{price} ₽</b>
				</span>

				{count ? (
					<CountButton value={count} size='lg' />
				) : (
					<Link href={`/product/${id}`}>
						<Button variant='secondary'>
							<Plus className='w-4 h-4 mr-1' />
							Добавить
						</Button>
					</Link>
				)}
			</div>
		</div>
	)
}
