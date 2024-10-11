import axios from 'axios'

// 5:39:00
export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
})
