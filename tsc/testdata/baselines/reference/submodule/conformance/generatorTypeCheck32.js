//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck32.ts] ////

//// [generatorTypeCheck32.ts]
var s: string;
var f: () => number = () => yield s;

//// [generatorTypeCheck32.js]
var s;
var f = () => yield s;
