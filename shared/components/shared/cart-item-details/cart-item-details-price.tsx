import { cn } from '@/shared/lib/utils'

interface Props {
	value: number
	className?: string
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
	// Проверка орфографии

	return <h2 className={cn('font-bold', className)}>{value} ₽</h2>
}
