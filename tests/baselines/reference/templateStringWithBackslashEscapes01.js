//// [tests/cases/conformance/es6/templates/templateStringWithBackslashEscapes01.ts] ////

//// [templateStringWithBackslashEscapes01.ts]
var a = `hello\world`;
var b = `hello\\world`;
var c = `hello\\\world`;
var d = `hello\\\\world`;

//// [templateStringWithBackslashEscapes01.js]
var a = "helloworld";
var b = "hello\\world";
var c = "hello\\world";
var d = "hello\\\\world";
