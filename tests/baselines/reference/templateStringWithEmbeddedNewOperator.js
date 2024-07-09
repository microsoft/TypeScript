//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedNewOperator.ts] ////

//// [templateStringWithEmbeddedNewOperator.ts]
var x = `abc${ new String("Hi") }def`;

//// [templateStringWithEmbeddedNewOperator.js]
var x = "abc".concat(new String("Hi"), "def");
