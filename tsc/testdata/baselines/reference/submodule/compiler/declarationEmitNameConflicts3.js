//// [tests/cases/compiler/declarationEmitNameConflicts3.ts] ////

//// [declarationEmitNameConflicts3.ts]
module M {
    export interface D { }
    export module D {
        export function f() { }
    }
    export module C {
        export function f() { }
    }
    export module E {
        export function f() { }
    }
}

module M.P {
    export class C {
        static f() { }
    }
    export class E extends C { }
    export enum D {
        f
    }
    export var v: M.D; // ok
    export var w = M.D.f; // error, should be typeof M.D.f
    export var x = M.C.f; // error, should be typeof M.C.f
    export var x = M.E.f; // error, should be typeof M.E.f
}

//// [declarationEmitNameConflicts3.js]
var M;
(function (M) {
    let D;
    (function (D) {
        function f() { }
        D.f = f;
    })(D = M.D || (M.D = {}));
    let C;
    (function (C) {
        function f() { }
        C.f = f;
    })(C = M.C || (M.C = {}));
    let E;
    (function (E) {
        function f() { }
        E.f = f;
    })(E = M.E || (M.E = {}));
})(M || (M = {}));
(function (M) {
    let P;
    (function (P) {
        class C {
            static f() { }
        }
        P.C = C;
        class E extends C {
        }
        P.E = E;
        let D;
        (function (D) {
            D[D["f"] = 0] = "f";
        })(D = P.D || (P.D = {}));
        P.w = M.D.f; // error, should be typeof M.D.f
        P.x = M.C.f; // error, should be typeof M.C.f
        P.x = M.E.f; // error, should be typeof M.E.f
    })(P = M.P || (M.P = {}));
})(M || (M = {}));
