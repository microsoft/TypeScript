//// [tests/cases/compiler/declarationEmitNameConflicts2.ts] ////

//// [declarationEmitNameConflicts2.ts]
module X.Y.base {
    export function f() { }
    export class C { }
    export module M {
        export var v;
    }
    export enum E { }
}

module X.Y.base.Z {
    export var f = X.Y.base.f; // Should be base.f
    export var C = X.Y.base.C; // Should be base.C
    export var M = X.Y.base.M; // Should be base.M
    export var E = X.Y.base.E; // Should be base.E
}

//// [declarationEmitNameConflicts2.js]
var X;
(function (X) {
    let Y;
    (function (Y) {
        let base;
        (function (base) {
            function f() { }
            base.f = f;
            class C {
            }
            base.C = C;
            let M;
            (function (M) {
            })(M = base.M || (base.M = {}));
            let E;
            (function (E) {
            })(E = base.E || (base.E = {}));
        })(base = Y.base || (Y.base = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
(function (X) {
    let Y;
    (function (Y) {
        let base;
        (function (base) {
            let Z;
            (function (Z) {
                Z.f = X.Y.base.f; // Should be base.f
                Z.C = X.Y.base.C; // Should be base.C
                Z.M = X.Y.base.M; // Should be base.M
                Z.E = X.Y.base.E; // Should be base.E
            })(Z = base.Z || (base.Z = {}));
        })(base = Y.base || (Y.base = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
