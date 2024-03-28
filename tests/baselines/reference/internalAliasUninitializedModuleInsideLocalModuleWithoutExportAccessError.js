//// [tests/cases/compiler/internalAliasUninitializedModuleInsideLocalModuleWithoutExportAccessError.ts] ////

//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExportAccessError.ts]
export module a {
    export module b {
        export interface I {
            foo();
        }
    }
}

export module c {
    import b = a.b;
    export var x: b.I;
    x.foo();
}


export var z: c.b.I;

//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExportAccessError.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.z = exports.c = void 0;
    var c;
    (function (c) {
        c.x.foo();
    })(c || (exports.c = c = {}));
});
