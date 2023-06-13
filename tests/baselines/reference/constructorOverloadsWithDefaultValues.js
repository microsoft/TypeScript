//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/constructorOverloadsWithDefaultValues.ts] ////

//// [constructorOverloadsWithDefaultValues.ts]
class C {
    foo: string;
    constructor(x = 1); // error
    constructor() {
    }
}

class D<T> {
    foo: string;
    constructor(x = 1); // error
    constructor() {
    }
}

//// [constructorOverloadsWithDefaultValues.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
