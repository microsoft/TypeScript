//// [tests/cases/conformance/types/primitives/string/stringPropertyAccessWithError.ts] ////

//// [stringPropertyAccessWithError.ts]
var x = '';
var d = x['charAt']('invalid'); // error

//// [stringPropertyAccessWithError.js]
var x = '';
var d = x['charAt']('invalid'); // error
