//// [tests/cases/compiler/outModuleConcatUnspecifiedModuleKind.ts] ////

//// [a.ts]
export class A { } // module

//// [b.ts]
var x = 0; // global

//// [out.js]
"use strict";
var x = 0; // global
