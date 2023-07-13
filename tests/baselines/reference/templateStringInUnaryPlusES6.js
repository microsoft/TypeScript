//// [tests/cases/conformance/es6/templates/templateStringInUnaryPlusES6.ts] ////

//// [templateStringInUnaryPlusES6.ts]
var x = +`abc${ 123 }def`;

//// [templateStringInUnaryPlusES6.js]
var x = +`abc${123}def`;
