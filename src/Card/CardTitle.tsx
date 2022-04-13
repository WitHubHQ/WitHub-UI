import React, { ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
import { IComponentBaseProps } from '../types'

export type CardTitleProps = React.HTMLAttributes<HTMLDivElement> &
  IComponentBaseProps & {
    tag?: ElementType
  }

const CardTitle = React.forwardRef<HTMLElement, CardTitleProps>(
  ({ className, ...props }) => {
    return (
      <div {...props} className={twMerge('card-title', className)} />
    )
  }
)

export default CardTitle
