//// [emitRestParametersMethodES6.ts]
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


//// [emitRestParametersMethodES6.js]
var C = (function () {
    function C(name, ...rest) {
    }
    C.prototype.bar = function (...rest) { };
    C.prototype.foo = function (x, ...rest) { };
    return C;
})();
var D = (function () {
    function D(...rest) {
    }
    D.prototype.bar = function (...rest) { };
    D.prototype.foo = function (x, ...rest) { };
    return D;
})();
