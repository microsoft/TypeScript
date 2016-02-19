//// [getAndSetNotIdenticalType3.ts]
class A<T> { foo: T; }

class C<T> {
    data: A<number>;
    get x(): A<number> {
        return this.data;
    }
    set x(v: A<string>) {
        this.data = v;
    }
}

var x = new C();
var r = x.x;
x.x = r;

//// [getAndSetNotIdenticalType3.js]
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
        set: function (v) {
            this.data = v;
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());
var x = new C();
var r = x.x;
x.x = r;
