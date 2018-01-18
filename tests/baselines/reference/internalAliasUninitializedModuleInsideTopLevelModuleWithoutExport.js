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
exports.__esModule = true;
exports.x.foo();


//// [internalAliasUninitializedModuleInsideTopLevelModuleWithoutExport.d.ts]
import b = a.b;
export declare module a {
    module b {
        interface I {
            foo(): any;
        }
    }
}
export declare var x: b.I;
