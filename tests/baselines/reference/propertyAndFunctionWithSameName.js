//// [propertyAndFunctionWithSameName.ts]
class C {
    x: number;
    x() { // error
        return 1;
    }
}

class D {
    x: number;
    x(v) { } // error
}

//// [propertyAndFunctionWithSameName.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.x = function () {
        return 1;
    };
    return C;
}());
var D = (function () {
    function D() {
    }
    var proto_2 = D.prototype;
    proto_2.x = function (v) { }; // error
    return D;
}());
