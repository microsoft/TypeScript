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
exports.x;
exports.x.foo();
