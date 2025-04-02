//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedNewOperatorES6.ts] ////

//// [templateStringWithEmbeddedNewOperatorES6.ts]
var x = `abc${ new String("Hi") }def`;

//// [templateStringWithEmbeddedNewOperatorES6.js]
var x = `abc${new String("Hi")}def`;
