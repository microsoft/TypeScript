//// [tests/cases/conformance/es6/templates/templateStringInArrowFunction.ts] ////

//// [templateStringInArrowFunction.ts]
var x = x => `abc${ x }def`;

//// [templateStringInArrowFunction.js]
var x = function (x) { return "abc".concat(x, "def"); };
