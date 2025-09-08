//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendsItselfIndirectly2.ts] ////

//// [classExtendsItselfIndirectly2.ts]
class C extends N.E { foo: string; } // error

module M {
    export class D extends C { bar: string; }

}

module N {
    export class E extends M.D { baz: number; }
}

module O {
    class C2<T> extends Q.E2<T> { foo: T; } // error

    module P {
        export class D2<T> extends C2<T> { bar: T; }
    }

    module Q {
        export class E2<T> extends P.D2<T> { baz: T; }
    }
}

//// [classExtendsItselfIndirectly2.js]
class C extends N.E {
    foo;
} // error
var M;
(function (M) {
    class D extends C {
        bar;
    }
    M.D = D;
})(M || (M = {}));
var N;
(function (N) {
    class E extends M.D {
        baz;
    }
    N.E = E;
})(N || (N = {}));
var O;
(function (O) {
    class C2 extends Q.E2 {
        foo;
    } // error
    let P;
    (function (P) {
        class D2 extends C2 {
            bar;
        }
        P.D2 = D2;
    })(P || (P = {}));
    let Q;
    (function (Q) {
        class E2 extends P.D2 {
            baz;
        }
        Q.E2 = E2;
    })(Q || (Q = {}));
})(O || (O = {}));
