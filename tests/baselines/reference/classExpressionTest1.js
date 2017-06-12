//// [classExpressionTest1.ts]
function M() {
    class C<X> {
        f<T>() {
            var t: T;
            var x: X;
            return { t, x };
        }
    }

    var v = new C<number>();
    return v.f<string>();
}

//// [classExpressionTest1.js]
function M() {
    var C = (function () {
        function C() {
        }
        var proto_1 = C.prototype;
        proto_1.f = function () {
            var t;
            var x;
            return { t: t, x: x };
        };
        return C;
    }());
    var v = new C();
    return v.f();
}
