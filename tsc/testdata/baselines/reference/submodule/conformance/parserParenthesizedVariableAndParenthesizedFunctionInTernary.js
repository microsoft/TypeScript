//// [tests/cases/conformance/parser/ecmascript5/parserParenthesizedVariableAndParenthesizedFunctionInTernary.ts] ////

//// [parserParenthesizedVariableAndParenthesizedFunctionInTernary.ts]
let a: any;
const c = true ? (a) : (function() {});
const d = true ? (a) : ((function() {}));


//// [parserParenthesizedVariableAndParenthesizedFunctionInTernary.js]
let a;
const c = true ? (a) : (function () { });
const d = true ? (a) : ((function () { }));
