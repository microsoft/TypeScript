//// [tests/cases/compiler/unusedImports15.ts] ////

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




//// [foo.jsx]
"use strict";
exports.__esModule = true;
exports.FooComponent = void 0;
var Element = require("react");
exports.FooComponent = <div></div>;
