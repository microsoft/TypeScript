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
var E = (function () {
    function E() {
    }
    return E;
}());
