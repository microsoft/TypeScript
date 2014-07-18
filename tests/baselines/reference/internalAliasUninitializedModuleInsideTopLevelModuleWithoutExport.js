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


//// [internalAliasUninitializedModuleInsideTopLevelModuleWithoutExport.d.ts]
export declare module a {
    module b {
        interface I {
            foo(): any;
        }
    }
}
export declare var x: b.I;


//// [DtsFileErrors]


==== tests/cases/compiler/internalAliasUninitializedModuleInsideTopLevelModuleWithoutExport.d.ts (1 errors) ====
    export declare module a {
        module b {
            interface I {
                foo(): any;
            }
        }
    }
    export declare var x: b.I;
                          ~~~
!!! Cannot find name 'b'.
    