//// [tests/cases/conformance/parser/ecmascript5/parserParenthesizedVariableAndParenthesizedFunctionInTernary.ts] ////

//// [parserParenthesizedVariableAndParenthesizedFunctionInTernary.ts]
let a: any;
const c = true ? (a) : (function() {});
const d = true ? (a) : ((function() {}));


//// [parserParenthesizedVariableAndParenthesizedFunctionInTernary.js]
"use strict";
var a;
var c = true ? (a) : (function () { });
var d = true ? (a) : ((function () { }));
