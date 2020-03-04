//// [tests/cases/compiler/unusedImports14.ts] ////

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




//// [foo.js]
"use strict";
exports.__esModule = true;
exports.FooComponent = void 0;
var React = require("react");
exports.FooComponent = React.createElement("div", null);
