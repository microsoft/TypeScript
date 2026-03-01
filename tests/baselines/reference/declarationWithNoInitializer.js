//// [tests/cases/conformance/es6/destructuring/declarationWithNoInitializer.ts] ////

//// [declarationWithNoInitializer.ts]
var [a, b];          // Error, no initializer
var {c, d};          // Error, no initializer


//// [declarationWithNoInitializer.js]
"use strict";
var [a, b]; // Error, no initializer
var { c, d }; // Error, no initializer
