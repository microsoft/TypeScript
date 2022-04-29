//// [genericGetter2.ts]
class A<T> { }

class C<T> {
    data: A<T>;
    get x(): A {
        return this.data;
    }
}

//// [genericGetter2.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
