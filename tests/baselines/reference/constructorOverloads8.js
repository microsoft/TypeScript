//// [constructorOverloads8.ts]
class C {
    constructor(x) { }
    constructor(y, x) { } // illegal, 2 constructor implementations
}

class D {
    constructor(x: number);
    constructor(y: string); // legal, overload signatures for 1 implementation
    constructor(x) { }
}

interface I {
    new (x);
    new (x, y); // legal, overload signatures for (presumably) 1 implementation
}

//// [constructorOverloads8.js]
var C = /** @class */ (function () {
    function C(x) {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D(x) {
    }
    return D;
}());
