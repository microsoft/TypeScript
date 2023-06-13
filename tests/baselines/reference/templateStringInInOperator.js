//// [tests/cases/conformance/es6/templates/templateStringInInOperator.ts] ////

//// [templateStringInInOperator.ts]
var x = `${ "hi" }` in { hi: 10, hello: 20};

//// [templateStringInInOperator.js]
var x = "".concat("hi") in { hi: 10, hello: 20 };
