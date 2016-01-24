//// [declarationEmit_nameConflictsWithAlias.ts]
export module C { export interface I { } }
export import v = C;
export module M {
    export module C { export interface I { } }
    export var w: v.I; // Gets emitted as C.I, which is the wrong interface
}

//// [declarationEmit_nameConflictsWithAlias.js]
"use strict";
var M;
(function (M) {
})(M = exports.M || (exports.M = {}));


//// [declarationEmit_nameConflictsWithAlias.d.ts]
export declare module C {
    interface I {
    }
}
export import v = C;
export declare module M {
    module C {
        interface I {
        }
    }
    var w: v.I;
}
