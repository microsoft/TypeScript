//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedTypeAssertionOnAdditionES6.ts] ////

//// [templateStringWithEmbeddedTypeAssertionOnAdditionES6.ts]
var x = `abc${ <any>(10 + 10) }def`;

//// [templateStringWithEmbeddedTypeAssertionOnAdditionES6.js]
var x = `abc${(10 + 10)}def`;
