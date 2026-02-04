//// [tests/cases/compiler/typeCheckExportsVariable.ts] ////

//// [typeCheckExportsVariable.ts]
let exports: number;
exports = '';

//// [typeCheckExportsVariable.js]
"use strict";
let exports;
exports = '';
