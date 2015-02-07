//// [emitDefaultParametersMethodES6.ts]
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

//// [emitDefaultParametersMethodES6.js]
var C = (function () {
    function C(t, z, x, y = "hello") {
    }
    C.prototype.foo = function (x, t = false) { };
    C.prototype.foo1 = function (x, t = false, ...rest) { };
    C.prototype.bar = function (t = false) { };
    C.prototype.boo = function (t = false, ...rest) { };
    return C;
})();
var D = (function () {
    function D(y = "hello") {
    }
    return D;
})();
var E = (function () {
    function E(y = "hello", ...rest) {
    }
    return E;
})();
