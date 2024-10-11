'use client'

import { useCategoryStore } from '@/shared/store'
import React from 'react'
import { useIntersection } from 'react-use' // 2:10:00
import { ProductCard } from './product-cart'
import { Title } from './title'

interface Props {
	title: string
	items: any[]
	className?: string
	categoryId?: any
}

// 2:00:00
export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	className,
	categoryId,
}) => {
	// 2:10:00
	const intersectionRef = React.useRef(null)
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	})

	const setActiveCategoryId = useCategoryStore(
		(state: any) => state.setActiveId
	)

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId)
		}
	}, [intersection?.isIntersecting, title, items])

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size='lg' className='font-extrabold mb-5' />
			<div className='grid grid-cols-3 gap-[50px]'>
				{items.map((item: any, i: number) => (
					<ProductCard
						key={item.id}
						id={item.id}
						name={item.name}
						imageUrl={item.imageUrl}
						price={item.items.find((item: any) => item.price)?.price || 0}
						count={i % 2}
						ingredients={item.ingredients}
					/>
				))}
			</div>
		</div>
	)
}
