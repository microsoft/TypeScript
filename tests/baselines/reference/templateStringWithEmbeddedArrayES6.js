//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedArrayES6.ts] ////

//// [templateStringWithEmbeddedArrayES6.ts]
var x = `abc${ [1,2,3] }def`;

//// [templateStringWithEmbeddedArrayES6.js]
var x = `abc${[1, 2, 3]}def`;
