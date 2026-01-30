//// [tests/cases/compiler/staticMethodsReferencingClassTypeParameters.ts] ////

//// [staticMethodsReferencingClassTypeParameters.ts]
class C<T> {
    static s(p: T) { return p; }
}

//// [staticMethodsReferencingClassTypeParameters.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    C.s = function (p) { return p; };
    return C;
}());
