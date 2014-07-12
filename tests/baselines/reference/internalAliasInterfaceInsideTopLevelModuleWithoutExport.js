//// [internalAliasInterfaceInsideTopLevelModuleWithoutExport.ts]
export module a {
    export interface I {
    }
}

import b = a.I;
export var x: b;


//// [internalAliasInterfaceInsideTopLevelModuleWithoutExport.js]
define(["require", "exports"], function(require, exports) {
    exports.x;
});


////[internalAliasInterfaceInsideTopLevelModuleWithoutExport.d.ts]
export declare module a {
    interface I {
    }
}
export declare var x: a.I;
