//// [tests/cases/compiler/internalAliasInterfaceInsideTopLevelModuleWithoutExport.ts] ////

//// [internalAliasInterfaceInsideTopLevelModuleWithoutExport.ts]
export module a {
    export interface I {
    }
}

import b = a.I;
export var x: b;


//// [internalAliasInterfaceInsideTopLevelModuleWithoutExport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
});


//// [internalAliasInterfaceInsideTopLevelModuleWithoutExport.d.ts]
export declare namespace a {
    interface I {
    }
}
import b = a.I;
export declare var x: b;
