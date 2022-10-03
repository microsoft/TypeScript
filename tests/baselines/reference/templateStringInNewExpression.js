//// [templateStringInNewExpression.ts]
new `abc${0}abc`(`hello ${0} world`, `   `, `1${2}3`);

//// [templateStringInNewExpression.js]
new ("abc".concat(0, "abc"))("hello ".concat(0, " world"), "   ", "1".concat(2, "3"));
