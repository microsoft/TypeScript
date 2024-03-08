//// [tests/cases/compiler/typeInferenceWithTypeAnnotation.ts] ////

//// [typeInferenceWithTypeAnnotation.ts]
declare function f<T>(p: (t: T) => T): T;

f((n: number) => n); 

//// [typeInferenceWithTypeAnnotation.js]
f(function (n) { return n; });
