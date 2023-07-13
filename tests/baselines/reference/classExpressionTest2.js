//// [tests/cases/compiler/classExpressionTest2.ts] ////

//// [classExpressionTest2.ts]
function M() {
    var m = class C<X> {
        f<T>() {
            var t: T;
            var x: X;
            return { t, x };
        }
    }

    var v = new m<number>();
    return v.f<string>();
}

//// [classExpressionTest2.js]
function M() {
    var m = /** @class */ (function () {
        function C() {
        }
        C.prototype.f = function () {
            var t;
            var x;
            return { t: t, x: x };
        };
        return C;
    }());
    var v = new m();
    return v.f();
}
