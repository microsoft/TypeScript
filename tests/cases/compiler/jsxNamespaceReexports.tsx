
// @jsx: react
// @jsxFactory: MyLib.createElement
// @strict: true
// @filename: library.ts
function createElement(element: string, props: any, ...children: any[]): any {}

namespace JSX {
  export interface IntrinsicElements {
    [key: string]: Record<string, any>;
  }
}

export { createElement, JSX };
// @filename: index.tsx
import * as MyLib from "./library";

const content = <my-element/>;