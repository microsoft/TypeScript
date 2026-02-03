//// [tests/cases/compiler/typeInferenceFixEarly.ts] ////

//// [typeInferenceFixEarly.ts]
declare function f<T>(p: (t: T) => T): T;

f(n => 3);

//// [typeInferenceFixEarly.js]
"use strict";
f(n => 3);
