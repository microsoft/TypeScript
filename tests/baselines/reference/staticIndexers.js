//// [tests/cases/conformance/classes/indexMemberDeclarations/staticIndexers.ts] ////

//// [staticIndexers.ts]
// static indexers not allowed

class C {
    static [x: string]: string;
}

class D {
    static [x: number]: string;
}

class E<T> {
    static [x: string]: T;
}

//// [staticIndexers.js]
// static indexers not allowed
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
var E = /** @class */ (function () {
    function E() {
    }
    return E;
}());
