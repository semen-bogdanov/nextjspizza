import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

// Параметры по умолчанию
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

// 14:02:00 фильтрация
export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(',').map(Number); // размер
  const pizzaTypes = params.pizzaTypes?.split(',').map(Number); // тип
  const ingredientsIdArr = params.ingredients?.split(',').map(Number); // ингредиенты

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE; // взять минимальную стоимость товара
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE; // взять максимальную стоимость товара

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsIdArr
            ? {
              some: {
                id: {
                  in: ingredientsIdArr,
                },
              },
            }
            : undefined,
          items: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: minPrice, // >=
                lte: maxPrice, // <=
              },
            },
          },
        },
        include: {
          ingredients: true,
          items: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });

  return categories;
};
