//// [emitRestParametersMethod.ts]
class C {
    constructor(name: string, ...rest) { }

    public bar(...rest) { }
    public foo(x: number, ...rest) { }
}

class D {
    constructor(...rest) { }

    public bar(...rest) { }
    public foo(x: number, ...rest) { }
}

//// [emitRestParametersMethod.js]
var C = /** @class */ (function () {
    function C(name) {
    }
    C.prototype.bar = function () { };
    C.prototype.foo = function (x) { };
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.bar = function () { };
    D.prototype.foo = function (x) { };
    return D;
}());
