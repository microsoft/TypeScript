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
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function () {
    function D() {
    }
    return D;
}());
