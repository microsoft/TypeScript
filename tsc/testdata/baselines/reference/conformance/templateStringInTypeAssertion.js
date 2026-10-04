//// [tests/cases/conformance/es6/templates/templateStringInTypeAssertion.ts] ////

//// [templateStringInTypeAssertion.ts]
var x = <any>`abc${ 123 }def`;

//// [templateStringInTypeAssertion.js]
"use strict";
var x = `abc${123}def`;
