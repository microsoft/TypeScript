//// [classWithDuplicateIdentifier.ts]
class C {
    a(): number { return 0; } // error: duplicate identifier
    a: number;
}
class K {
    b: number; // error: duplicate identifier
    b(): number { return 0; }
}
class D {
    c: number;
    c: string;
}


//// [classWithDuplicateIdentifier.js]
var C = (function () {
    function C() {
    }
    C.prototype.a = function () { return 0; }; // error: duplicate identifier
    return C;
}());
var K = (function () {
    function K() {
    }
    K.prototype.b = function () { return 0; };
    return K;
}());
var D = (function () {
    function D() {
    }
    return D;
}());
