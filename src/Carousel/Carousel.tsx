import React, {
  cloneElement,
  createRef, 
  forwardRef,
  ReactElement,
  RefObject,
  useEffect,
  useState
} from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { IComponentBaseProps } from '../types'

import CarouselItem, { CarouselItemProps } from './CarouselItem'
import Button from '../Button'

export type CarouselProps = React.HTMLAttributes<HTMLDivElement> &
  IComponentBaseProps & {
    children: ReactElement<CarouselItemProps>[]
    display?: 'slider' | 'numbered' | 'sequential'
    snap?: 'start' | 'center' | 'end'
    vertical?: boolean
    fullWidth?: boolean
  }

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    { children, display = 'slider', snap, vertical, fullWidth, dataTheme, className, ...props },
    ref
  ): JSX.Element => {
    const classes = twMerge(
      'carousel',
      className,
      clsx({
        [`carousel-${snap}`]: snap,
        'carousel-vertical': vertical,
        'w-full': display !== 'slider'
      })
    )

    const [itemRefs, setItemRefs] = useState<RefObject<HTMLDivElement>[]>([])

    useEffect(() => {
      const newRefs: RefObject<HTMLDivElement>[] = []
      children.map((_) => {
        newRefs.push(createRef<HTMLDivElement>())
      })
      setItemRefs(newRefs)
    }, [children])

    const scrollToIndex = (index: number) => {
      itemRefs[index].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: snap,
      })
    }

    return (
      <>
        <div
          role="listbox"
          aria-label="Image carousel"
          {...props}
          ref={ref}
          data-theme={dataTheme}
          className={classes}
        >
          {children.map((child, i) => {
            return cloneElement(child, {
              className: display !== 'slider' || fullWidth ? 'w-full' : '',
              innerRef: itemRefs[i],
              index: i + 1,
              children: child.props.children,
              src: child.props.src,
              alt: child.props.alt,
              buttons: display === 'sequential',
              fullWidth: display !== 'slider' || fullWidth,
              onPrev: () => scrollToIndex(i - 1 <= 0 ? children.length - 1 : i - 1),
              onNext: () => scrollToIndex(i + 1 > children.length - 1 ? 0 : i + 1),
              ...child.props,
            })
          })}
        </div>
        {display === 'numbered' && (
          <div className='flex justify-center w-full py-2 gap-2'>
            {children.map((_, i) => {
              return (
                // TODO: pass in customizable numbered buttons
                <Button key={i} onClick={() => scrollToIndex(i)}>
                  {i + 1}
                </Button>
              )
            })}
          </div>
        )}
      </>
    )
  }
)

export default Object.assign(Carousel, { Item: CarouselItem })
