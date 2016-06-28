//// [genericGetter2.ts]
class A<T> { }

class C<T> {
    data: A<T>;
    get x(): A {
        return this.data;
    }
}

//// [genericGetter2.js]
var A = (function () {
    function A() {
    }
    return A;
}());
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());
