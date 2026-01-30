//// [tests/cases/compiler/overloadedStaticMethodSpecialization.ts] ////

//// [overloadedStaticMethodSpecialization.ts]
class A<T> {
    static B<S>(v: A<S>): A<S>;
    static B<S>(v: S): A<S>;
    static B<S>(v: any): A<S> {
        return null;
    }
}


//// [overloadedStaticMethodSpecialization.js]
"use strict";
var A = /** @class */ (function () {
    function A() {
    }
    A.B = function (v) {
        return null;
    };
    return A;
}());
