//// [prototypeInstantiatedWithBaseConstraint.ts]
class C<T> {
    x: T;
}

C.prototype.x.boo; // No error, prototype is instantiated to any

//// [prototypeInstantiatedWithBaseConstraint.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
C.prototype.x.boo; // No error, prototype is instantiated to any
