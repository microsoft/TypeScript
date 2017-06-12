//// [staticAndNonStaticPropertiesSameName.ts]
class C {
    x: number;
    static x: number;

    f() { }
    static f() { }
}

//// [staticAndNonStaticPropertiesSameName.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.f = function () { };
    C.f = function () { };
    return C;
}());
