// @module: esnext
// @isolatedModules: true
// @noTypesAndSymbols: true

// @Filename: jsx.ts
export namespace JSXInternal {
  export type HTMLAttributes = string
  export type ComponentChildren = string
}

// @Filename: factory.ts
import { JSXInternal } from "./jsx"

export import JSX = JSXInternal;

export function createElement<ElementType extends HTMLElement>(
  tagName: string,
  attributes: JSX.HTMLAttributes,
  ...children: JSX.ComponentChildren[]
): any {
  //...
}

