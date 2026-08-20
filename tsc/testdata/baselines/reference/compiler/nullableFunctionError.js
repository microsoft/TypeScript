//// [tests/cases/compiler/nullableFunctionError.ts] ////

//// [nullableFunctionError.ts]
null();
undefined();
let f: null | undefined;
f();


//// [nullableFunctionError.js]
"use strict";
null();
undefined();
let f;
f();
