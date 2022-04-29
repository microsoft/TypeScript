//// [readonlyInConstructorParameters.ts]
class C {
    constructor(readonly x: number) {}
}
new C(1).x = 2;

class E {
    constructor(readonly public x: number) {}
}

class F {
    constructor(private readonly x: number) {}
}
new F(1).x;

//// [readonlyInConstructorParameters.js]
var C = /** @class */ (function () {
    function C(x) {
        this.x = x;
    }
    return C;
}());
new C(1).x = 2;
var E = /** @class */ (function () {
    function E(x) {
        this.x = x;
    }
    return E;
}());
var F = /** @class */ (function () {
    function F(x) {
        this.x = x;
    }
    return F;
}());
new F(1).x;
