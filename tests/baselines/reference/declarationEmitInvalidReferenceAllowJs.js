//// [tests/cases/compiler/declarationEmitInvalidReferenceAllowJs.ts] ////

//// [declarationEmitInvalidReferenceAllowJs.ts]
/// <reference path="invalid" />
var x = 0; 


//// [declarationEmitInvalidReferenceAllowJs.js]
/// <reference path="invalid" />
var x = 0;


//// [declarationEmitInvalidReferenceAllowJs.d.ts]
declare var x: number;
