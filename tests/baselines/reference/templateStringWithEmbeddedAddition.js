//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedAddition.ts] ////

//// [templateStringWithEmbeddedAddition.ts]
var x = `abc${ 10 + 10 }def`;

//// [templateStringWithEmbeddedAddition.js]
var x = "abc".concat(10 + 10, "def");
