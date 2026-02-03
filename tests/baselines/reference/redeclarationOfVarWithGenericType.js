//// [tests/cases/compiler/redeclarationOfVarWithGenericType.ts] ////

//// [redeclarationOfVarWithGenericType.ts]
var a1: { fn<T>(x: T): T };
var a1: { fn<T>(x: T): T };

//// [redeclarationOfVarWithGenericType.js]
"use strict";
var a1;
var a1;
