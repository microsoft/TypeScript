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
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "x", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());
