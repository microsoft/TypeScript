//// [emitRestParametersMethod.ts]
class C {
    constructor(name: string, ...rest) { rest; }

    public bar(...rest) { rest; }
    public foo(x: number, ...rest) { rest; }
}

class D {
    constructor(...rest) { rest; }

    public bar(...rest) { rest; }
    public foo(x: number, ...rest) { rest; }
}

//// [emitRestParametersMethod.js]
var C = /** @class */ (function () {
    function C(name) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        rest;
    }
    C.prototype.bar = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        rest;
    };
    C.prototype.foo = function (x) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        rest;
    };
    return C;
}());
var D = /** @class */ (function () {
    function D() {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        rest;
    }
    D.prototype.bar = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        rest;
    };
    D.prototype.foo = function (x) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        rest;
    };
    return D;
}());
