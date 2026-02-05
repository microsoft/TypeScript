//// [tests/cases/compiler/overloadResolutionOverCTLambda.ts] ////

//// [overloadResolutionOverCTLambda.ts]
function foo(b: (item: number) => boolean) { }
foo(a => a); // can not convert (number)=>bool to (number)=>number

//// [overloadResolutionOverCTLambda.js]
"use strict";
function foo(b) { }
foo(a => a); // can not convert (number)=>bool to (number)=>number
