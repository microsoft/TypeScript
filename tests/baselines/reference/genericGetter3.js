//// [genericGetter3.ts]
class A<T> { }

class C<T> {
    data: A<T>;
    get x(): A<T> {
        return this.data;
    }
}

var c = new C<number>();
var r: string = c.x;

//// [genericGetter3.js]
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
var c = new C();
var r = c.x;
