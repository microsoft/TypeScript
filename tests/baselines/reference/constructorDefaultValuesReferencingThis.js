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
    function C(x) {
        if (x === void 0) { x = this; }
    }
    return C;
}());
var D = (function () {
    function D(x) {
        if (x === void 0) { x = this; }
    }
    return D;
}());
var E = (function () {
    function E(x) {
        if (x === void 0) { x = this; }
        this.x = x;
    }
    return E;
}());
