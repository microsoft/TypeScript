//// [parameterPropertyOutsideConstructor.ts]
class C {
    foo(public x) {
    }
}

//// [parameterPropertyOutsideConstructor.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
    };
    return C;
}());
