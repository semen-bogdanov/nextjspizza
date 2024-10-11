import { Ingredient, Product, ProductItem } from '@prisma/client'

// 8:56:00
export type ProductWithRelations = Product & {
	items: ProductItem[]
	ingredients: Ingredient[]
}
