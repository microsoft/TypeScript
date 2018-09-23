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
var X = X || (X = {});
(function (X) {
    var Y = X.Y || (X.Y = {});
    (function (Y) {
        var base = Y.base || (Y.base = {});
        (function (base) {
            function f() { }
            base.f = f;
            var C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            base.C = C;
            var M = base.M || (base.M = {});
            (function (M) {
            })(M);
            var E = base.E || (base.E = {});
            (function (E) {
            })(E);
        })(base);
    })(Y);
})(X);
(function (X) {
    var Y = X.Y || (X.Y = {});
    (function (Y) {
        var base = Y.base || (Y.base = {});
        (function (base) {
            var Z = base.Z || (base.Z = {});
            (function (Z) {
                Z.f = X.Y.base.f; // Should be base.f
                Z.C = X.Y.base.C; // Should be base.C
                Z.M = X.Y.base.M; // Should be base.M
                Z.E = X.Y.base.E; // Should be base.E
            })(Z);
        })(base);
    })(Y);
})(X);


//// [declarationEmitNameConflicts2.d.ts]
declare module X.Y.base {
    function f(): void;
    class C {
    }
    module M {
        var v: any;
    }
    enum E {
    }
}
declare module X.Y.base.Z {
    var f: typeof base.f;
    var C: typeof base.C;
    var M: typeof base.M;
    var E: typeof base.E;
}
