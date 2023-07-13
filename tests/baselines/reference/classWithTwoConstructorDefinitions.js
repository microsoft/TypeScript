//// [tests/cases/conformance/classes/constructorDeclarations/classWithTwoConstructorDefinitions.ts] ////

//// [classWithTwoConstructorDefinitions.ts]
class C {
    constructor() { } // error
    constructor(x) { } // error
}

class D<T> {
    constructor(x: T) { } // error
    constructor(x: T, y: T) { } // error
}

//// [classWithTwoConstructorDefinitions.js]
var C = /** @class */ (function () {
    function C() {
    } // error
    return C;
}());
var D = /** @class */ (function () {
    function D(x) {
    } // error
    return D;
}());
