//// [tests/cases/conformance/es6/restParameters/emitRestParametersFunction.ts] ////

//// [emitRestParametersFunction.ts]
function bar(...rest) { }
function foo(x: number, y: string, ...rest) { }

//// [emitRestParametersFunction.js]
"use strict";
function bar(...rest) { }
function foo(x, y, ...rest) { }
