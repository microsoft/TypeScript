//// [tests/cases/compiler/typeInferenceTypePredicate.ts] ////

//// [typeInferenceTypePredicate.ts]
declare function f<T>(predicate: (x: {}) => x is T): T;
// 'res' should be of type 'number'.
const res = f((n): n is number => true);


//// [typeInferenceTypePredicate.js]
const res = f((n) => true);
