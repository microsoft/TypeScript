//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/constructorOverloadsWithOptionalParameters.ts] ////

//// [constructorOverloadsWithOptionalParameters.ts]
class C {
    foo: string;
    constructor(x?, y?: any[]); 
    constructor() {
    }
}

class D<T> {
    foo: string;
    constructor(x?, y?: any[]); 
    constructor() {
    }
}

//// [constructorOverloadsWithOptionalParameters.js]
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
