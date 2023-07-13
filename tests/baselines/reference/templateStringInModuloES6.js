//// [tests/cases/conformance/es6/templates/templateStringInModuloES6.ts] ////

//// [templateStringInModuloES6.ts]
var x = 1 % `abc${ 1 }def`;

//// [templateStringInModuloES6.js]
var x = 1 % `abc${1}def`;
