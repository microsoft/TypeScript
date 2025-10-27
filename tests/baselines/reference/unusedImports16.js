//// [tests/cases/compiler/unusedImports16.ts] ////

//// [foo.tsx]
import Element = require("react");

export const FooComponent = <div></div>

//// [index.d.ts]
export = React;
export as namespace React;

declare namespace React {
    function createClass<P, S>(spec);
}
declare global {
    namespace JSX {
    }
}




//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooComponent = void 0;
const Element = require("react");
exports.FooComponent = Element.createElement("div", null);
