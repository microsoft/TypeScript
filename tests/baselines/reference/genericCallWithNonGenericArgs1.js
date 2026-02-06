//// [tests/cases/compiler/genericCallWithNonGenericArgs1.ts] ////

//// [genericCallWithNonGenericArgs1.ts]
function f<T>(x: any) { }
f<any>(null)


//// [genericCallWithNonGenericArgs1.js]
"use strict";
function f(x) { }
f(null);
