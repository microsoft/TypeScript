//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedAdditionES6.ts] ////

//// [templateStringWithEmbeddedAdditionES6.ts]
var x = `abc${ 10 + 10 }def`;

//// [templateStringWithEmbeddedAdditionES6.js]
var x = `abc${10 + 10}def`;
