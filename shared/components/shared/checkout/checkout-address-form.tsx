'use client'

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { AdressInput } from '../address-input'
import { ErrorText } from '../error-text'
import { FormTextarea } from '../form'
import { WhiteBlock } from '../white-block'

interface Props {
	className?: string
}

// оформление заказа
export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext()

	// react-hook-form 17:21:00 Controller
	return (
		<WhiteBlock title='3. Адрес доставки' className={className}>
			<div className='flex flex-col gap-5'>
				<Controller
					control={control}
					name='address'
					render={({ field, fieldState }) => (
						<>
							<AdressInput onChange={field.onChange} />
							{fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
						</>
					)}
				/>

				<FormTextarea
					name='comment'
					className='text-base'
					placeholder='Комментарий к заказу'
					rows={5}
				/>
			</div>
		</WhiteBlock>
	)
}
