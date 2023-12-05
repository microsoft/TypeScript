//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedMultiplication.ts] ////

//// [templateStringWithEmbeddedMultiplication.ts]
var x = `abc${ 7 * 6 }def`;

//// [templateStringWithEmbeddedMultiplication.js]
var x = "abc".concat(7 * 6, "def");
