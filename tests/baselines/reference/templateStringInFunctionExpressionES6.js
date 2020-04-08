//// [templateStringInFunctionExpressionES6.ts]
var x = function y() {
    `abc${ 0 }def`
    return `abc${ 0 }def`;
};

//// [templateStringInFunctionExpressionES6.js]
var x = function y() {
    `abc${0}def`;
    return `abc${0}def`;
};
