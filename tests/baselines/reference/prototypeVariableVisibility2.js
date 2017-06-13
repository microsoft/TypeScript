//// [prototypeVariableVisibility2.ts]
class A {
    a() {
        return proto_1;
    }
}

var proto_1;

//// [prototypeVariableVisibility2.js]
var A = (function () {
    function A() {
    }
    var proto_2 = A.prototype;
    proto_2.a = function () {
        return proto_1;
    };
    return A;
}());
var proto_1;
