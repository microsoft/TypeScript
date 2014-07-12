//// [classWithTwoConstructorDefinitions.ts]
class C {
    constructor() { }
    constructor(x) { } // error
}

class D<T> {
    constructor(x: T) { }
    constructor(x: T, y: T) { } // error
}

//// [classWithTwoConstructorDefinitions.js]
var C = (function () {
    function C() {
    }
    return C;
})();
var D = (function () {
    function D(x) {
    }
    return D;
})();
