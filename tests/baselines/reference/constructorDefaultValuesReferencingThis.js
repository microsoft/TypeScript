//// [constructorDefaultValuesReferencingThis.ts]
class C {
    constructor(x = this) { }
}

class D<T> {
    constructor(x = this) { }
}

class E<T> {
    constructor(public x = this) { }
}

//// [constructorDefaultValuesReferencingThis.js]
var C = (function () {
    function C() {
        var x = (arguments[0] === void 0) ? this : arguments[0];
    }
    return C;
})();
var D = (function () {
    function D() {
        var x = (arguments[0] === void 0) ? this : arguments[0];
    }
    return D;
})();
var E = (function () {
    function E() {
        var x = (arguments[0] === void 0) ? this : arguments[0];
        this.x = x;
    }
    return E;
})();
