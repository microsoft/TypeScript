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
var c = new C();
var r = c.x;
