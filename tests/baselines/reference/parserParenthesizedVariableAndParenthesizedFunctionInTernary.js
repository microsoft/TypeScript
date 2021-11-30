//// [parserParenthesizedVariableAndParenthesizedFunctionInTernary.ts]
let a: any;
const c = true ? (a) : (function() {});


//// [parserParenthesizedVariableAndParenthesizedFunctionInTernary.js]
var a;
var c = true ? (a) : (function () { });
