//// [privateIndexer.ts]
// private indexers not allowed

class C {
    private [x: string]: string;
}

class D {
    private [x: number]: string;
}

class E<T> {
    private [x: string]: T;
}

//// [privateIndexer.js]
// private indexers not allowed
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
