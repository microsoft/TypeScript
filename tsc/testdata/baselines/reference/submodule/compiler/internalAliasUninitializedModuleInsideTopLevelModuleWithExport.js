//// [tests/cases/compiler/internalAliasUninitializedModuleInsideTopLevelModuleWithExport.ts] ////

//// [internalAliasUninitializedModuleInsideTopLevelModuleWithExport.ts]
export module a {
    export module b {
        export interface I {
            foo();
        }
    }
}

export import b = a.b;
export var x: b.I;
x.foo();


//// [internalAliasUninitializedModuleInsideTopLevelModuleWithExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x.foo();
