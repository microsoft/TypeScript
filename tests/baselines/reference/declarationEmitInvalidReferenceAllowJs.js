//// [tests/cases/compiler/declarationEmitInvalidReferenceAllowJs.ts] ////

//// [declarationEmitInvalidReferenceAllowJs.ts]
/// <reference path="invalid" />
var x = 0; 


//// [declarationEmitInvalidReferenceAllowJs.js]
"use strict";
/// <reference path="invalid" />
var x = 0;


//// [declarationEmitInvalidReferenceAllowJs.d.ts]
declare var x: number;
