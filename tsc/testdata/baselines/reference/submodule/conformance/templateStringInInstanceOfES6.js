//// [tests/cases/conformance/es6/templates/templateStringInInstanceOfES6.ts] ////

//// [templateStringInInstanceOfES6.ts]
var x = `abc${ 0 }def` instanceof String;

//// [templateStringInInstanceOfES6.js]
var x = `abc${0}def` instanceof String;
