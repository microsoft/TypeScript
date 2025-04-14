//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedInOperator.ts] ////

//// [templateStringWithEmbeddedInOperator.ts]
var x = `abc${ "hi" in { hi: 10, hello: 20} }def`;

//// [templateStringWithEmbeddedInOperator.js]
var x = "abc".concat("hi" in { hi: 10, hello: 20 }, "def");
