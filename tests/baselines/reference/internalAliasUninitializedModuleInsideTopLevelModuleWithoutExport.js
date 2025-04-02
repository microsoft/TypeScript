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


//// [internalAliasUninitializedModuleInsideTopLevelModuleWithoutExport.d.ts]
export declare namespace a {
    namespace b {
        interface I {
            foo(): any;
        }
    }
}
import b = a.b;
export declare var x: b.I;
