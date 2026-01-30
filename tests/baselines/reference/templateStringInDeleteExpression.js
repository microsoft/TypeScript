//// [tests/cases/conformance/es6/templates/templateStringInDeleteExpression.ts] ////

//// [templateStringInDeleteExpression.ts]
delete `abc${0}abc`;

//// [templateStringInDeleteExpression.js]
"use strict";
delete "abc".concat(0, "abc");
