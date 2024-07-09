//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedTypeOfOperatorES6.ts] ////

//// [templateStringWithEmbeddedTypeOfOperatorES6.ts]
var x = `abc${ typeof "hi" }def`;

//// [templateStringWithEmbeddedTypeOfOperatorES6.js]
var x = `abc${typeof "hi"}def`;
