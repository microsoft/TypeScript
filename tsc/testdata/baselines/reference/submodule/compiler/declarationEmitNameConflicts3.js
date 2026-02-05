//// [tests/cases/compiler/declarationEmitNameConflicts3.ts] ////

//// [declarationEmitNameConflicts3.ts]
namespace M {
    export interface D { }
    export namespace D {
        export function f() { }
    }
    export namespace C {
        export function f() { }
    }
    export namespace E {
        export function f() { }
    }
}

namespace M.P {
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
"use strict";
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


//// [declarationEmitNameConflicts3.d.ts]
declare namespace M {
    interface D {
    }
    namespace D {
        function f(): void;
    }
    namespace C {
        function f(): void;
    }
    namespace E {
        function f(): void;
    }
}
declare namespace M.P {
    class C {
        static f(): void;
    }
    class E extends C {
    }
    enum D {
        f = 0
    }
    var v: M.D;
    var w: typeof M.D.f;
    var x: typeof M.C.f;
    var x: typeof M.C.f;
}
