//// [tests/cases/compiler/unusedImports13.ts] ////

//// [foo.tsx]
import React = require("react");

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




//// [foo.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooComponent = void 0;
var React = require("react");
exports.FooComponent = <div></div>;
