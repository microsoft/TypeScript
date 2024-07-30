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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = createElement;
function createElement(element, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
}
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyLib = require("./library");
var content = MyLib.createElement("my-element", null);
