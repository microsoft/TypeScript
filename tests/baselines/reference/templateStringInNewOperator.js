//// [tests/cases/conformance/es6/templates/templateStringInNewOperator.ts] ////

//// [templateStringInNewOperator.ts]
var x = new `abc${ 1 }def`;

//// [templateStringInNewOperator.js]
var x = new `abc${1}def`;
