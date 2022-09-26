// @noImplicitAny: true
// @esModuleInterop: true
// @jsx: react

/// <reference path="/.lib/react16.d.ts" />
import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react'

type ButtonBaseProps<T extends ElementType> =
   ComponentPropsWithRef<T> & {
  children?: ReactNode
}

function Component<T extends ElementType = 'span'>(props: ButtonBaseProps<T>) {
  return <></>
}

const v1 = <Component onClick={e => e.preventDefault()} />