//// [tests/cases/compiler/genericInstanceOf.ts] ////

//// [genericInstanceOf.ts]
interface F {
    (): number;
}

class C<T> {
    constructor(public a: T, public b: F) {}
    foo() {
        if (this.a instanceof this.b) {
        }
    }
}

//// [genericInstanceOf.js]
var C = /** @class */ (function () {
    function C(a, b) {
        this.a = a;
        this.b = b;
    }
    C.prototype.foo = function () {
        if (this.a instanceof this.b) {
        }
    };
    return C;
}());
