//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedUnaryPlusES6.ts] ////

//// [templateStringWithEmbeddedUnaryPlusES6.ts]
var x = `abc${ +Infinity }def`;

//// [templateStringWithEmbeddedUnaryPlusES6.js]
var x = `abc${+Infinity}def`;
