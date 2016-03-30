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
var C = (function () {
    function C() {
    }
    C.prototype.f = function () { };
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    C2.prototype.f = function (x) { };
    return C2;
}());
