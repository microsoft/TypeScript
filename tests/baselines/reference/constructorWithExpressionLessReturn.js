//// [constructorWithExpressionLessReturn.ts]
class C {
    constructor() {
        return;
    }
}

class D {
    x: number;
    constructor() {
        return;
    }
}

class E {
    constructor(public x: number) {
        return;
    }
}

class F<T> {
    constructor(public x: T) {
        return;
    }
}

//// [constructorWithExpressionLessReturn.js]
var C = /** @class */ (function () {
    function C() {
        return;
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
        return;
    }
    return D;
}());
var E = /** @class */ (function () {
    function E(x) {
        this.x = x;
        return;
    }
    return E;
}());
var F = /** @class */ (function () {
    function F(x) {
        this.x = x;
        return;
    }
    return F;
}());
