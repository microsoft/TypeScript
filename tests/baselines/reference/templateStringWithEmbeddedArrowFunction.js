//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedArrowFunction.ts] ////

//// [templateStringWithEmbeddedArrowFunction.ts]
var x = `abc${ x => x }def`;

//// [templateStringWithEmbeddedArrowFunction.js]
var x = "abc".concat(function (x) { return x; }, "def");
