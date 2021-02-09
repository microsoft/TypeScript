// @jsx: react
// @jsxFactory: jsx
// @ts-ignore
import React from 'react'

declare const jsx: typeof React.createElement
namespace jsx {
    export namespace JSX {
        export interface Element {}
        export interface ElementClass {}
        export interface ElementAttributesProperty {}
        export interface ElementChildrenAttribute {}
        export interface IntrinsicAttributes {}
        export interface IntrinsicClassAttributes<T> {}
        export type IntrinsicElements = {
            div: { className: string }
        }
        // Works
        // export type LibraryManagedAttributes<C, P> = P & { css: string };

        // Equivalent to above, but fails
        export type WithCSSProp<P> = P & { css: string }
        export type LibraryManagedAttributes<C, P> = WithCSSProp<P>

    }
}

declare const Comp: (p: { className?: string }) => null

;<Comp css="color:hotpink;" />