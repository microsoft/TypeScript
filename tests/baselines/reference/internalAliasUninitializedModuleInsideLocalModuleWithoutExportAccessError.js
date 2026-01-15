//// [tests/cases/compiler/internalAliasUninitializedModuleInsideLocalModuleWithoutExportAccessError.ts] ////

//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExportAccessError.ts]
export namespace a {
    export namespace b {
        export interface I {
            foo();
        }
    }
}

export namespace c {
    import b = a.b;
    export declare var x: b.I;
    x.foo();
}


export var z: c.b.I;

//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExportAccessError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.c = void 0;
var c;
(function (c) {
    c.x.foo();
})(c || (exports.c = c = {}));
