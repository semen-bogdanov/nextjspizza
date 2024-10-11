import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/shared/components/shared'
import { Stories } from '@/shared/components/shared/stories'
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas'
import { Suspense } from 'react' // 13:45:00

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
	const categories = await findPizzas(searchParams)

	return (
		<>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>

			<TopBar categories={categories.filter((category: any) => category.products.length > 0)} />

			{/* 22:21:00 */}
			<Stories />

			<Container className='mt-10 pb-14'>
				<div className='flex gap-[80px]'>
					{/* Фильтрация */}
					<div className='w-[250px]'>
						<Suspense>
							<Filters />
						</Suspense>
					</div>

					{/* Список товаров */}
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categories.map(
								(category: any) =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											categoryId={category.id}
											items={category.products}
										/>
									),
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
