//// [staticMethodsReferencingClassTypeParameters.ts]
class C<T> {
    static s(p: T) { return p; }
}

//// [staticMethodsReferencingClassTypeParameters.js]
var C = (function () {
    function C() {
    }
    C.s = function (p) { return p; };
    return C;
}());
