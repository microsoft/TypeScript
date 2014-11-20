//// [constructorImplementationWithDefaultValues2.ts]
class C {
    constructor(x);
    constructor(public x: string = 1) { // error
        var y = x;
    }
}

class D<T, U> {
    constructor(x: T, y: U);
    constructor(x: T = 1, public y: U = x) { // error
        var z = x;
    }
}

class E<T extends Date> {
    constructor(x);
    constructor(x: T = new Date()) { // error
        var y = x;
    }
}

//// [constructorImplementationWithDefaultValues2.js]
var C = (function () {
    function C() {
        var x = (arguments[0] === void 0) ? 1 : arguments[0];
        this.x = x;
        var y = x;
    }
    return C;
})();
var D = (function () {
    function D() {
        var x = (arguments[0] === void 0) ? 1 : arguments[0];
        var y = (arguments[1] === void 0) ? x : arguments[1];
        this.y = y;
        var z = x;
    }
    return D;
})();
var E = (function () {
    function E() {
        var x = (arguments[0] === void 0) ? new Date() : arguments[0];
        var y = x;
    }
    return E;
})();
