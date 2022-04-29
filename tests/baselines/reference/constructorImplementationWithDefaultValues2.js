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
var C = /** @class */ (function () {
    function C(x) {
        if (x === void 0) { x = 1; }
        this.x = x;
        var y = x;
    }
    return C;
}());
var D = /** @class */ (function () {
    function D(x, y) {
        if (x === void 0) { x = 1; }
        if (y === void 0) { y = x; }
        this.y = y;
        var z = x;
    }
    return D;
}());
var E = /** @class */ (function () {
    function E(x) {
        if (x === void 0) { x = new Date(); }
        var y = x;
    }
    return E;
}());
