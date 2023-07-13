//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedArray.ts] ////

//// [templateStringWithEmbeddedArray.ts]
var x = `abc${ [1,2,3] }def`;

//// [templateStringWithEmbeddedArray.js]
var x = "abc".concat([1, 2, 3], "def");
