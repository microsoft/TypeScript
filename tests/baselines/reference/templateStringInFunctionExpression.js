//// [templateStringInFunctionExpression.ts]
var x = function y() {
    `abc${ 0 }def`
    return `abc${ 0 }def`;
};

//// [templateStringInFunctionExpression.js]
var x = function y() {
    "abc".concat(0, "def");
    return "abc".concat(0, "def");
};
