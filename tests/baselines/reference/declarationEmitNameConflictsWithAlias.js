//// [declarationEmitNameConflictsWithAlias.ts]
export module C { export interface I { } }
export import v = C;
export module M {
    export module C { export interface I { } }
    export var w: v.I; // Gets emitted as C.I, which is the wrong interface
}

//// [declarationEmitNameConflictsWithAlias.js]
"use strict";
exports.__esModule = true;
exports.M = void 0;
var M;
(function (M) {
})(M = exports.M || (exports.M = {}));


//// [declarationEmitNameConflictsWithAlias.d.ts]
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
