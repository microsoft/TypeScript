//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedMultiplicationES6.ts] ////

//// [templateStringWithEmbeddedMultiplicationES6.ts]
var x = `abc${ 7 * 6 }def`;

//// [templateStringWithEmbeddedMultiplicationES6.js]
var x = `abc${7 * 6}def`;
