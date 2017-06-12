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
    var proto_1 = C.prototype;
    proto_1.a = function () { return 0; }; // error: duplicate identifier
    return C;
}());
var K = (function () {
    function K() {
    }
    var proto_2 = K.prototype;
    proto_2.b = function () { return 0; };
    return K;
}());
var D = (function () {
    function D() {
    }
    return D;
}());
