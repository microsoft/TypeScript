//// [tests/cases/compiler/internalAliasInterfaceInsideTopLevelModuleWithoutExport.ts] ////

//// [internalAliasInterfaceInsideTopLevelModuleWithoutExport.ts]
export module a {
    export interface I {
    }
}

import b = a.I;
export var x: b;


//// [internalAliasInterfaceInsideTopLevelModuleWithoutExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
