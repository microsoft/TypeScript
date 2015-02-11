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
var C = (function () {
    function C(name) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    }
    C.prototype.bar = function () { };
    C.prototype.foo = function (x) { };
    return C;
})();
var D = (function () {
    function D() {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i - 0] = arguments[_i];
        }
    }
    D.prototype.bar = function () { };
    D.prototype.foo = function (x) { };
    return D;
})();
