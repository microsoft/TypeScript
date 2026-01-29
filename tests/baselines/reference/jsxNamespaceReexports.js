//// [tests/cases/compiler/jsxNamespaceReexports.tsx] ////

//// [library.ts]
function createElement(element: string, props: any, ...children: any[]): any {}

namespace JSX {
  export interface IntrinsicElements {
    [key: string]: Record<string, any>;
  }
}

export { createElement, JSX };
//// [index.tsx]
import * as MyLib from "./library";

const content = <my-element/>;

//// [library.js]
function createElement(element, props, ...children) { }
export { createElement };
//// [index.js]
import * as MyLib from "./library";
const content = MyLib.createElement("my-element", null);
