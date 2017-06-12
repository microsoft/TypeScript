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
var C = (function () {
    function C(a, b) {
        this.a = a;
        this.b = b;
    }
    var proto_1 = C.prototype;
    proto_1.foo = function () {
        if (this.a instanceof this.b) {
        }
    };
    return C;
}());
