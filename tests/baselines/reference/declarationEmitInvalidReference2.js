//// [tests/cases/compiler/declarationEmitInvalidReference2.ts] ////

//// [declarationEmitInvalidReference2.ts]
/// <reference path="invalid.ts" />
var x = 0;

//// [declarationEmitInvalidReference2.js]
/// <reference path="invalid.ts" />
var x = 0;


//// [declarationEmitInvalidReference2.d.ts]
declare var x: number;
