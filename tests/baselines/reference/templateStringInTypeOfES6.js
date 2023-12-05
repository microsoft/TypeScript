//// [tests/cases/conformance/es6/templates/templateStringInTypeOfES6.ts] ////

//// [templateStringInTypeOfES6.ts]
var x = typeof `abc${ 123 }def`;

//// [templateStringInTypeOfES6.js]
var x = typeof `abc${123}def`;
