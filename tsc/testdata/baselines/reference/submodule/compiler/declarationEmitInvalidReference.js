//// [tests/cases/compiler/declarationEmitInvalidReference.ts] ////

//// [declarationEmitInvalidReference.ts]
/// <reference path="invalid.ts" />
var x = 0;

//// [declarationEmitInvalidReference.js]
"use strict";
/// <reference path="invalid.ts" />
var x = 0;


//// [declarationEmitInvalidReference.d.ts]
declare var x: number;
