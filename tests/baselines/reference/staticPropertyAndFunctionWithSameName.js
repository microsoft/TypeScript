//// [staticPropertyAndFunctionWithSameName.ts]
class C {
    static f: number;
    f: number;
}

class D {
    static f: number;
    f() { }
}

//// [staticPropertyAndFunctionWithSameName.js]
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function () {
    function D() {
    }
    D.prototype.f = function () { };
    return D;
}());
