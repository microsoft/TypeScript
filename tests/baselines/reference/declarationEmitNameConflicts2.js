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
    var Y;
    (function (Y) {
        var base;
        (function (base) {
            function f() { }
            base.f = f;
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            base.C = C;
            var M;
            (function (M) {
            })(M = base.M || (base.M = {}));
            var E;
            (function (E) {
            })(E = base.E || (base.E = {}));
        })(base = Y.base || (Y.base = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));
(function (X) {
    var Y;
    (function (Y) {
        var base;
        (function (base) {
            var Z;
            (function (Z) {
                Z.f = X.Y.base.f; // Should be base.f
                Z.C = X.Y.base.C; // Should be base.C
                Z.M = X.Y.base.M; // Should be base.M
                Z.E = X.Y.base.E; // Should be base.E
            })(Z = base.Z || (base.Z = {}));
        })(base = Y.base || (Y.base = {}));
    })(Y = X.Y || (X.Y = {}));
})(X || (X = {}));


//// [declarationEmitNameConflicts2.d.ts]
declare namespace X.Y.base {
    function f(): void;
    class C {
    }
    namespace M {
        var v: any;
    }
    enum E {
    }
}
declare namespace X.Y.base.Z {
    var f: typeof base.f;
    var C: typeof base.C;
    var M: typeof base.M;
    var E: typeof base.E;
}
