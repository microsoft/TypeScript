//// [tests/cases/conformance/es6/templates/templateStringInTypeAssertion.ts] ////

//// [templateStringInTypeAssertion.ts]
var x = <any>`abc${ 123 }def`;

//// [templateStringInTypeAssertion.js]
var x = "abc".concat(123, "def");
