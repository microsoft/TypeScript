//// [tests/cases/conformance/types/namedTypes/classWithOptionalParameter.ts] ////

//// [classWithOptionalParameter.ts]
// classes do not permit optional parameters, these are errors

class C {
    x?: string;
    f?() {}
}

class C2<T> {
    x?: T;
    f?(x: T) {}
}

//// [classWithOptionalParameter.js]
// classes do not permit optional parameters, these are errors
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.f = function () { };
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.f = function (x) { };
    return C2;
}());
