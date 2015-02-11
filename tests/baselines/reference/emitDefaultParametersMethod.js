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
var C = (function () {
    function C(t, z, x, y) {
        if (y === void 0) { y = "hello"; }
    }
    C.prototype.foo = function (x, t) { };
    C.prototype.foo1 = function (x, t) { };
    C.prototype.bar = function (t) { };
    C.prototype.boo = function (t) { };
    return C;
})();
var D = (function () {
    function D(y) {
        if (y === void 0) { y = "hello"; }
    }
    return D;
})();
var E = (function () {
    function E(y) {
        if (y === void 0) { y = "hello"; }
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    }
    return E;
})();
