//// [internalAliasInterfaceInsideTopLevelModuleWithExport.ts]
export module a {
    export interface I {
    }
}

export import b = a.I;
export var x: b;


//// [internalAliasInterfaceInsideTopLevelModuleWithExport.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;


//// [internalAliasInterfaceInsideTopLevelModuleWithExport.d.ts]
export declare module a {
    interface I {
    }
}
export import b = a.I;
export declare var x: b;
