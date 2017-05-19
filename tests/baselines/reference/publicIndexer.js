//// [publicIndexer.ts]
// public indexers not allowed

class C {
    public [x: string]: string;
}

class D {
    public [x: number]: string;
}

class E<T> {
    public [x: string]: T;
}

//// [publicIndexer.js]
// public indexers not allowed
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
