//// [tests/cases/conformance/es6/templates/templateStringInCallExpression.ts] ////

//// [templateStringInCallExpression.ts]
`abc${0}abc`(`hello ${0} world`, `   `, `1${2}3`);

//// [templateStringInCallExpression.js]
`abc${0}abc`(`hello ${0} world`, `   `, `1${2}3`);
