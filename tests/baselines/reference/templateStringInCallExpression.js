//// [templateStringInCallExpression.ts]
`abc${0}abc`(`hello ${0} world`, `   `, `1${2}3`);

//// [templateStringInCallExpression.js]
"abc".concat(0, "abc")("hello ".concat(0, " world"), "   ", "1".concat(2, "3"));
