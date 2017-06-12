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
    var proto_1 = C.prototype;
    proto_1.f = function () { };
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    var proto_2 = C2.prototype;
    proto_2.f = function (x) { };
    return C2;
}());
