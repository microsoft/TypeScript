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
