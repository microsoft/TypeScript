//// [tests/cases/compiler/typeCheckExportsVariable.ts] ////

//// [typeCheckExportsVariable.ts]
let exports: number;
exports = '';

//// [typeCheckExportsVariable.js]
var exports;
exports = '';
