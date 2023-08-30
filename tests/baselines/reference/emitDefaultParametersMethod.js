//// [tests/cases/conformance/es6/defaultParameters/emitDefaultParametersMethod.ts] ////

//// [emitDefaultParametersMethod.ts]
class C {
    constructor(t: boolean, z: string, x: number, y = "hello") { }

    public foo(x: string, t = false) { }
    public foo1(x: string, t = false, ...rest) { }
    public bar(t = false) { }
    public boo(t = false, ...rest) { }
}

class D {
    constructor(y = "hello") { }
}

class E {
    constructor(y = "hello", ...rest) { }
}


//// [emitDefaultParametersMethod.js]
var C = /** @class */ (function () {
    function C(t, z, x, y) {
        if (y === void 0) { y = "hello"; }
    }
    C.prototype.foo = function (x, t) {
        if (t === void 0) { t = false; }
    };
    C.prototype.foo1 = function (x, t) {
        if (t === void 0) { t = false; }
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
    };
    C.prototype.bar = function (t) {
        if (t === void 0) { t = false; }
    };
    C.prototype.boo = function (t) {
        if (t === void 0) { t = false; }
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    };
    return C;
}());
var D = /** @class */ (function () {
    function D(y) {
        if (y === void 0) { y = "hello"; }
    }
    return D;
}());
var E = /** @class */ (function () {
    function E(y) {
        if (y === void 0) { y = "hello"; }
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    }
    return E;
}());
