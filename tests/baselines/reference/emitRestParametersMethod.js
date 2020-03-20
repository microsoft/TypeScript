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
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    }
    C.prototype.bar = function () {
        var rest = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            rest[_a] = arguments[_a];
        }
    };
    C.prototype.foo = function (x) {
        var rest = [];
        for (var _b = 1; _b < arguments.length; _b++) {
            rest[_b - 1] = arguments[_b];
        }
    };
    return C;
}());
var D = /** @class */ (function () {
    function D() {
        var rest = [];
        for (var _c = 0; _c < arguments.length; _c++) {
            rest[_c] = arguments[_c];
        }
    }
    D.prototype.bar = function () {
        var rest = [];
        for (var _d = 0; _d < arguments.length; _d++) {
            rest[_d] = arguments[_d];
        }
    };
    D.prototype.foo = function (x) {
        var rest = [];
        for (var _e = 1; _e < arguments.length; _e++) {
            rest[_e - 1] = arguments[_e];
        }
    };
    return D;
}());
