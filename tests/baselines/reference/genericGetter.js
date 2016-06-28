//// [genericGetter.ts]
class C<T> {
    data: T;
    get x(): T {
        return this.data;
    }
}

var c = new C<number>();
var r: string = c.x;

//// [genericGetter.js]
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
var c = new C();
var r = c.x;
