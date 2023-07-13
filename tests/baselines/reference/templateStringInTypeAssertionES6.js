//// [tests/cases/conformance/es6/templates/templateStringInTypeAssertionES6.ts] ////

//// [templateStringInTypeAssertionES6.ts]
var x = <any>`abc${ 123 }def`;

//// [templateStringInTypeAssertionES6.js]
var x = `abc${123}def`;
