//// [tests/cases/compiler/typeInferenceFixEarly.ts] ////

//// [typeInferenceFixEarly.ts]
declare function f<T>(p: (t: T) => T): T;

f(n => 3);

//// [typeInferenceFixEarly.js]
f(function (n) { return 3; });
