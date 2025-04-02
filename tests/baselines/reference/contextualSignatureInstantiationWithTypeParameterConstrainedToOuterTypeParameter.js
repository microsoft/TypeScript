//// [tests/cases/compiler/contextualSignatureInstantiationWithTypeParameterConstrainedToOuterTypeParameter.ts] ////

//// [contextualSignatureInstantiationWithTypeParameterConstrainedToOuterTypeParameter.ts]
function f<T>() {
    function g<U extends T>(u: U): U { return null }
    return g;
}
var h: <V, W>(v: V, func: (v: V) => W) => W;
var x = h("", f<string>()); // Call should succeed and x should be string. All type parameters should be instantiated to string

//// [contextualSignatureInstantiationWithTypeParameterConstrainedToOuterTypeParameter.js]
function f() {
    function g(u) { return null; }
    return g;
}
var h;
var x = h("", f()); // Call should succeed and x should be string. All type parameters should be instantiated to string
