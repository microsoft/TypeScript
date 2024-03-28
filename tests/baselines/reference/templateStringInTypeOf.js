//// [tests/cases/conformance/es6/templates/templateStringInTypeOf.ts] ////

//// [templateStringInTypeOf.ts]
var x = typeof `abc${ 123 }def`;

//// [templateStringInTypeOf.js]
var x = typeof "abc".concat(123, "def");
