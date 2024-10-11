import { CartDTO, CreateCartItemValues } from './dto/cart.dto'
import { axiosInstance } from './instance'

export const getCart = async (): Promise<CartDTO> => {
	return (await axiosInstance.get<CartDTO>('/cart')).data
}

//12:10:00
export const updateItemQuantity = async (
	itemId: number,
	quantity: number
): Promise<CartDTO> => {
	return (await axiosInstance.patch<CartDTO>('/cart/' + itemId, { quantity }))
		.data
}

//12:20:00 Удаление товара из корзины
export const removeCartItem = async (id: number): Promise<CartDTO> => {
	return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data
}

//12:58:00 Добавление товара из корзины
export const addCartItem = async (
	values: CreateCartItemValues
): Promise<CartDTO> => {
	return (await axiosInstance.post<CartDTO>('/cart', values)).data
}
