//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedModuloES6.ts] ////

//// [templateStringWithEmbeddedModuloES6.ts]
var x = `abc${ 1 % 1 }def`;

//// [templateStringWithEmbeddedModuloES6.js]
var x = `abc${1 % 1}def`;
