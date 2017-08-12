//// [parameterPropertyOutsideConstructor.ts]
class C {
    foo(public x) {
    }
}

//// [parameterPropertyOutsideConstructor.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (x) {
    };
    return C;
}());
