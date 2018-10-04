//// [typeInferenceTypePredicate.ts]
declare function f<T>(predicate: (x: {}) => x is T): T;
// 'res' should be of type 'number'.
const res = f((n): n is number => true);


//// [typeInferenceTypePredicate.js]
// 'res' should be of type 'number'.
var res = f(function (n) { return true; });
