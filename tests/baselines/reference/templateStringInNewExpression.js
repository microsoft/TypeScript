//// [tests/cases/conformance/es6/templates/templateStringInNewExpression.ts] ////

//// [templateStringInNewExpression.ts]
new `abc${0}abc`(`hello ${0} world`, `   `, `1${2}3`);

//// [templateStringInNewExpression.js]
new `abc${0}abc`(`hello ${0} world`, `   `, `1${2}3`);
