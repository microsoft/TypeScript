//// [parameterPropertyOutsideConstructor.ts]
class C {
    foo(public x) {
    }
}

//// [parameterPropertyOutsideConstructor.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
    };
    return C;
}());
