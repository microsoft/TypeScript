//// [tests/cases/compiler/declarationEmitInvalidReference.ts] ////

//// [declarationEmitInvalidReference.ts]
/// <reference path="invalid.ts" />
var x = 0;

//// [invalid.js]
//// [declarationEmitInvalidReference.js]
var x = 0;
