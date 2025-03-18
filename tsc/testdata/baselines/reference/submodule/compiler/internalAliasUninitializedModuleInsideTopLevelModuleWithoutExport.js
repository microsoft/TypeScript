//// [tests/cases/compiler/internalAliasUninitializedModuleInsideTopLevelModuleWithoutExport.ts] ////

//// [internalAliasUninitializedModuleInsideTopLevelModuleWithoutExport.ts]
export module a {
    export module b {
        export interface I {
            foo();
        }
    }
}

import b = a.b;
export var x: b.I;
x.foo();


//// [internalAliasUninitializedModuleInsideTopLevelModuleWithoutExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x.foo();
