/// <reference path="fourslash.ts" />

// @module: CommonJS
// @declaration: true
//// export function /*1*/foo/*2*/() {
////     interface privateInterface {}
////     class Bar implements privateInterface { }
////     return Bar;
//// }

verify.errorExistsBetweenMarkers("1", "2");
verify.numberOfErrorsInCurrentFile(1);


