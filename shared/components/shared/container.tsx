import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	className?: string
}

// container 37 минута. Центрирует элемент (mx-auto max-w-[1280px] и задает максимальную ширину)
export const Container: React.FC<React.PropsWithChildren<Props>> = ({
	className,
	children,
}) => {
	return (
		<div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>
	)
}
