'use client'

import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-client'
import { Product } from '@prisma/client'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useClickAway, useDebounce } from 'react-use'

interface Props {
	className?: string
}

// 5:25:00 поиск по сайту
export const SearchInput = ({ className = '' }) => {
	const [searchQuery, setSearchQuery] = React.useState('')
	const [focused, setFocused] = React.useState(false)
	const [products, setProducts] = React.useState<Product[]>([])
	const ref = React.useRef(null)

	// 5:31:00 useClickAway из библиотеки react-use для клика по пустому пространству после поиска по input,
	// чтобы убрать тёмный фон
	useClickAway(ref, () => {
		setFocused(false)
	})

	// 5:51:00 useDebounce
	useDebounce(
		() => {
			Api.products.search(searchQuery).then((items: any) => {
				setProducts(items)
			})
		},
		150,
		[searchQuery]
	)

	const onClickItem = () => {
		setFocused(false)
		setSearchQuery('')
		setProducts([])
	}

	return (
		<>
			{focused && (
				<div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'></div>
			)}

			<div
				ref={ref}
				className={cn(
					'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
					className
				)}
			>
				<Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
				<input
					className='rounded-2xl outline-none w-full bg-gray-50 pl-11'
					type='text'
					placeholder='Найти пиццу...'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>

				{products.length > 0 && (
					<div
						className={cn(
							' absolute w-full  bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
							focused && 'visible opacity-100 top-12'
						)}
					>
						{products.map(product => (
							<Link
								onClick={onClickItem}
								key={product.id}
								className='flex items-center w-full px-3 py-2 hover:bg-primary/10 '
								href={`/product/${product.id}`}
							>
								<img
									className='rounded-sm w-8 h-8 ml-[-5px] mr-[5px]'
									src={product.imageUrl}
									width={32}
									height={32}
									alt={product.name}
								/>
								<span>{product.name}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	)
}
