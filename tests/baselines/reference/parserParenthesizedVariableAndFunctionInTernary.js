//// [parserParenthesizedVariableAndFunctionInTernary.ts]
let a: any;
const c = true ? (a) : function() {};


//// [parserParenthesizedVariableAndFunctionInTernary.js]
var a;
var c = true ? (a) : function () { };
