//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedDivisionES6.ts] ////

//// [templateStringWithEmbeddedDivisionES6.ts]
var x = `abc${ 1 / 1 }def`;

//// [templateStringWithEmbeddedDivisionES6.js]
var x = `abc${1 / 1}def`;
