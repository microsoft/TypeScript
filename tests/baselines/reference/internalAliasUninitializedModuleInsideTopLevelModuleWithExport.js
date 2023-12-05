//// [tests/cases/compiler/internalAliasUninitializedModuleInsideTopLevelModuleWithExport.ts] ////

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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x.foo();
});


//// [internalAliasUninitializedModuleInsideTopLevelModuleWithExport.d.ts]
export declare namespace a {
    namespace b {
        interface I {
            foo(): any;
        }
    }
}
export import b = a.b;
export declare var x: b.I;
