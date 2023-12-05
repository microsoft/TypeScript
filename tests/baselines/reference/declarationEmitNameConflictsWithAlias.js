//// [tests/cases/compiler/declarationEmitNameConflictsWithAlias.ts] ////

//// [declarationEmitNameConflictsWithAlias.ts]
export module C { export interface I { } }
export import v = C;
export module M {
    export module C { export interface I { } }
    export var w: v.I; // Gets emitted as C.I, which is the wrong interface
}

//// [declarationEmitNameConflictsWithAlias.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M = void 0;
var M;
(function (M) {
})(M || (exports.M = M = {}));


//// [declarationEmitNameConflictsWithAlias.d.ts]
export declare namespace C {
    interface I {
    }
}
export import v = C;
export declare namespace M {
    namespace C {
        interface I {
        }
    }
    var w: v.I;
}
