//// [internalAliasUninitializedModuleInsideTopLevelModuleWithExport.ts]
export module a {
    export module b {
        export interface I {
            foo();
        }
    }
}

export import b = a.b;
export var x: b.I;
x.foo();


//// [internalAliasUninitializedModuleInsideTopLevelModuleWithExport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x.foo();
});


//// [internalAliasUninitializedModuleInsideTopLevelModuleWithExport.d.ts]
export declare module a {
    module b {
        interface I {
            foo(): any;
        }
    }
}
export import b = a.b;
export declare var x: b.I;
