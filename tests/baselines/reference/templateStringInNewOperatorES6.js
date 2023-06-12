//// [tests/cases/conformance/es6/templates/templateStringInNewOperatorES6.ts] ////

//// [templateStringInNewOperatorES6.ts]
var x = new `abc${ 1 }def`;

//// [templateStringInNewOperatorES6.js]
var x = new `abc${1}def`;
