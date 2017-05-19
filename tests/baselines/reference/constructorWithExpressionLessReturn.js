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
var C = (function () {
    function C() {
        return;
    }
    return C;
}());
var D = (function () {
    function D() {
        return;
    }
    return D;
}());
var E = (function () {
    function E(x) {
        this.x = x;
        return;
    }
    return E;
}());
var F = (function () {
    function F(x) {
        this.x = x;
        return;
    }
    return F;
}());
