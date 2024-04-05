//// [tests/cases/conformance/expressions/contextualTyping/functionExpressionContextualTyping2.ts] ////

//// [functionExpressionContextualTyping2.ts]
// A contextual signature S is extracted from a function type T as follows:
//      If T is a function type with exactly one call signature, and if that call signature is non- generic, S is that signature.
//      If T is a union type, let U be the set of element types in T that have call signatures.
//          If each type in U has exactly one call signature and that call signature is non- generic,
//          and if all of the signatures are identical ignoring return types, then S is a signature
//          with the same parameters and a union of the return types.
//      Otherwise, no contextual signature can be extracted from T and S is undefined.

var a0: (n: number, s: string) => number
var a1: typeof a0 | ((n: number, s: string) => string);
a1 = (foo, bar) => { return true; }  // Error

//// [functionExpressionContextualTyping2.js]
// A contextual signature S is extracted from a function type T as follows:
//      If T is a function type with exactly one call signature, and if that call signature is non- generic, S is that signature.
//      If T is a union type, let U be the set of element types in T that have call signatures.
//          If each type in U has exactly one call signature and that call signature is non- generic,
//          and if all of the signatures are identical ignoring return types, then S is a signature
//          with the same parameters and a union of the return types.
//      Otherwise, no contextual signature can be extracted from T and S is undefined.
var a0;
var a1;
a1 = function (foo, bar) { return true; }; // Error
