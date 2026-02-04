//// [tests/cases/conformance/es6/templates/templateStringWithEmbeddedModulo.ts] ////

//// [templateStringWithEmbeddedModulo.ts]
var x = `abc${ 1 % 1 }def`;

//// [templateStringWithEmbeddedModulo.js]
"use strict";
var x = `abc${1 % 1}def`;
