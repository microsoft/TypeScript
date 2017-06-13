//// [prototypeVariableVisiblity1.ts]
const proto_1 = 1;
const proto_2 = 2;

class A {
    a(): number {
        return proto_1 + proto_2;
    }
}

//// [prototypeVariableVisiblity1.js]
var proto_1 = 1;
var proto_2 = 2;
var A = (function () {
    function A() {
    }
    var proto_3 = A.prototype;
    proto_3.a = function () {
        return proto_1 + proto_2;
    };
    return A;
}());
