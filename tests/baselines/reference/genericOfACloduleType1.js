//// [tests/cases/compiler/genericOfACloduleType1.ts] ////

//// [genericOfACloduleType1.ts]
class G<T>{ bar(x: T) { return x; } }
module M {
    export class C { foo() { } }
    export module C {
        export class X {
        }
    }
 
    var g1 = new G<C>();
    g1.bar(null).foo();
}
var g2 = new G<M.C>() // was: error Type reference cannot refer to container 'M.C'.

//// [genericOfACloduleType1.js]
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
    g1.bar(null).foo();
})(M || (M = {}));
var g2 = new G(); // was: error Type reference cannot refer to container 'M.C'.
