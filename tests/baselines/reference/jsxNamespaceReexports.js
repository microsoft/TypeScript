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
"use strict";
exports.__esModule = true;
exports.createElement = void 0;
function createElement(element, props) { }
exports.createElement = createElement;
//// [index.js]
"use strict";
exports.__esModule = true;
var MyLib = require("./library");
var content = MyLib.createElement("my-element", null);
