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
