//// [tests/cases/conformance/parser/ecmascript5/parserParenthesizedVariableAndFunctionInTernary.ts] ////

//// [parserParenthesizedVariableAndFunctionInTernary.ts]
let a: any;
const c = true ? (a) : function() {};


//// [parserParenthesizedVariableAndFunctionInTernary.js]
let a;
const c = true ? (a) : function () { };
