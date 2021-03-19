//// [tests/cases/compiler/jsxNamespaceImplicitImportJSXNamespaceFromConfigPickedOverGlobalOne.tsx] ////

//// [index.d.ts]
export = React;
export as namespace React;

declare namespace React {}

declare global {
  namespace JSX {
    interface Element {}
    interface ElementClass {}
    interface ElementAttributesProperty {}
    interface ElementChildrenAttribute {}
    type LibraryManagedAttributes<C, P> = {}
    interface IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T> {}
    interface IntrinsicElements {
      div: {}
    }
  }
}
//// [index.d.ts]
export { EmotionJSX as JSX } from './jsx-namespace'

//// [jsx-namespace.d.ts]
import 'react'

type WithConditionalCSSProp<P> = 'className' extends keyof P
  ? (P extends { className?: string } ? P & { css?: string } : P)
  : P

type ReactJSXElement = JSX.Element
type ReactJSXElementClass = JSX.ElementClass
type ReactJSXElementAttributesProperty = JSX.ElementAttributesProperty
type ReactJSXElementChildrenAttribute = JSX.ElementChildrenAttribute
type ReactJSXLibraryManagedAttributes<C, P> = JSX.LibraryManagedAttributes<C, P>
type ReactJSXIntrinsicAttributes = JSX.IntrinsicAttributes
type ReactJSXIntrinsicClassAttributes<T> = JSX.IntrinsicClassAttributes<T>
type ReactJSXIntrinsicElements = JSX.IntrinsicElements

export namespace EmotionJSX {
  interface Element extends ReactJSXElement {}
  interface ElementClass extends ReactJSXElementClass {}
  interface ElementAttributesProperty
    extends ReactJSXElementAttributesProperty {}
  interface ElementChildrenAttribute extends ReactJSXElementChildrenAttribute {}

  type LibraryManagedAttributes<C, P> = WithConditionalCSSProp<P> &
    ReactJSXLibraryManagedAttributes<C, P>

  interface IntrinsicAttributes extends ReactJSXIntrinsicAttributes {}
  interface IntrinsicClassAttributes<T>
    extends ReactJSXIntrinsicClassAttributes<T> {}

  type IntrinsicElements = {
    [K in keyof ReactJSXIntrinsicElements]: ReactJSXIntrinsicElements[K] & {
      css?: string
    }
  }
}

//// [index.tsx]
export const Comp = () => <div css="color: hotpink;"></div>;


//// [index.js]
"use strict";
exports.__esModule = true;
exports.Comp = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var Comp = function () { return (0, jsx_runtime_1.jsx)("div", { css: "color: hotpink;" }, void 0); };
exports.Comp = Comp;
