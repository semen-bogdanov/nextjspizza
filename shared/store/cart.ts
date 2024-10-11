import { create } from 'zustand'
import { getCartDetails } from '../lib'
import { CartStateItem } from '../lib/get-cart-details'
import { Api } from '../services/api-client'
import { CreateCartItemValues } from '../services/dto/cart.dto'

// 11:24:00 - zustand
export interface CartState {
	loading: boolean
	error: boolean
	totalAmount: number // общая стоимость в корзине
	items: CartStateItem[]

	/* Получение товаров из корзины */
	fetchCartItems: () => Promise<void>

	/* Запрос на обновление количества товара */
	updateItemQuantity: (id: number, quantity: number) => Promise<void>

	/* Запрос на добавление товара в корзину */
	addCartItem: (values: CreateCartItemValues) => Promise<void>

	/* Запрос на удаление товара из корзины */
	removeCartItem: (id: number) => Promise<void>
}
// Корзина товаров
export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,

	// 11:28:00 получение списка товаров (11:29:00 - объяснение)
	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.getCart()
			set(getCartDetails(data)) // обработка от сервера и возврат в том формате который нужен
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	//12:11:00 - обновление количества в самом товаре
	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.updateItemQuantity(id, quantity)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	//12:20:00
	//14:55:00 - правки при удалении карточки  
	removeCartItem: async (id: number) => {
		try {
			set(state => ({
				loading: true,
				error: false,
				items: state.items.map(item =>
					item.id === id ? { ...item, disabled: true } : item
				),
			}))
			const data = await Api.cart.removeCartItem(id)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set(state => ({
				loading: false,
				items: state.items.map(item => ({ ...item, disabled: false })),
			}))
		}
	},

	addCartItem: async (values: CreateCartItemValues) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.addCartItem(values)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
}))
