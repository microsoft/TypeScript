//// [tests/cases/conformance/es6/templates/templateStringInInOperatorES6.ts] ////

//// [templateStringInInOperatorES6.ts]
var x = `${ "hi" }` in { hi: 10, hello: 20};

//// [templateStringInInOperatorES6.js]
var x = `${"hi"}` in { hi: 10, hello: 20 };
