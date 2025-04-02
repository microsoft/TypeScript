//// [tests/cases/compiler/genericConstraint1.ts] ////

//// [genericConstraint1.ts]
class C<T> {
    public bar2<U extends T>(x: T, y: U): T {
        return null;
    }
}

var x = new C<number>();
x.bar2<string>(2, "");

//// [genericConstraint1.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.bar2 = function (x, y) {
        return null;
    };
    return C;
}());
var x = new C();
x.bar2(2, "");
