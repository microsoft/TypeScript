//// [tests/cases/compiler/classExpressionTest1.ts] ////

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
    class C {
        f() {
            var t;
            var x;
            return { t, x };
        }
    }
    var v = new C();
    return v.f();
}
