//// [tests/cases/conformance/es6/templates/templateStringInCallExpressionES6.ts] ////

//// [templateStringInCallExpressionES6.ts]
`abc${0}abc`(`hello ${0} world`, `   `, `1${2}3`);

//// [templateStringInCallExpressionES6.js]
"use strict";
`abc${0}abc`(`hello ${0} world`, `   `, `1${2}3`);
