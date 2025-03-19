//// [tests/cases/compiler/genericOfACloduleType2.ts] ////

//// [genericOfACloduleType2.ts]
class G<T>{ bar(x: T) { return x; } }
module M {
    export class C { foo() { } }
    export module C {
        export class X {
        }
    }

    var g1 = new G<C>();
    g1.bar(null).foo(); // no error
}

module N {
    var g2 = new G<M.C>()
}

//// [genericOfACloduleType2.js]
class G {
    bar(x) { return x; }
}
var M;
(function (M) {
    class C {
        foo() { }
    }
    M.C = C;
    (function (C) {
        class X {
        }
        C.X = X;
    })(C = M.C || (M.C = {}));
    var g1 = new G();
    g1.bar(null).foo(); // no error
})(M || (M = {}));
var N;
(function (N) {
    var g2 = new G();
})(N || (N = {}));
