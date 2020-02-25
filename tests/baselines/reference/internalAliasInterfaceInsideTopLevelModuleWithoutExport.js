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
    exports.__esModule = true;
    exports.x = void 0;
});


//// [internalAliasInterfaceInsideTopLevelModuleWithoutExport.d.ts]
export declare module a {
    interface I {
    }
}
import b = a.I;
export declare var x: b;
