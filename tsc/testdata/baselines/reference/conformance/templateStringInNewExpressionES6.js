//// [tests/cases/conformance/es6/templates/templateStringInNewExpressionES6.ts] ////

//// [templateStringInNewExpressionES6.ts]
new `abc${0}abc`(`hello ${0} world`, `   `, `1${2}3`);

//// [templateStringInNewExpressionES6.js]
"use strict";
new `abc${0}abc`(`hello ${0} world`, `   `, `1${2}3`);
