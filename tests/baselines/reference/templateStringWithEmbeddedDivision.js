//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedDivision.ts] ////

//// [templateStringWithEmbeddedDivision.ts]
var x = `abc${ 1 / 1 }def`;

//// [templateStringWithEmbeddedDivision.js]
var x = `abc${1 / 1}def`;
