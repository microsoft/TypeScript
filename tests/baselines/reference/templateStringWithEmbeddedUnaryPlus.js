//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedUnaryPlus.ts] ////

//// [templateStringWithEmbeddedUnaryPlus.ts]
var x = `abc${ +Infinity }def`;

//// [templateStringWithEmbeddedUnaryPlus.js]
var x = "abc".concat(+Infinity, "def");
