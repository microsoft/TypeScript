//// [tests/cases/compiler/parseArrowFunctionWithFunctionReturnType.ts] ////

//// [parseArrowFunctionWithFunctionReturnType.ts]
const fn = <T>(): (() => T) => null as any;


//// [parseArrowFunctionWithFunctionReturnType.js]
"use strict";
const fn = () => null;
