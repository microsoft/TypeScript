//// [constructorImplementationWithDefaultValues.ts]
class C {
    constructor(x);
    constructor(x = 1) {
        var y = x;
    }
}

class D<T> {
    constructor(x);
    constructor(x:T = null) {
        var y = x;
    }
}

class E<T extends Date> {
    constructor(x);
    constructor(x: T = null) {
        var y = x;
    }
}

//// [constructorImplementationWithDefaultValues.js]
var C = (function () {
    function C() {
        var x = (arguments[0] === void 0) ? 1 : arguments[0];
        var y = x;
    }
    return C;
})();
var D = (function () {
    function D() {
        var x = (arguments[0] === void 0) ? null : arguments[0];
        var y = x;
    }
    return D;
})();
var E = (function () {
    function E() {
        var x = (arguments[0] === void 0) ? null : arguments[0];
        var y = x;
    }
    return E;
})();
