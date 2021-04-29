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
    exports.__esModule = true;
    exports.z = exports.c = void 0;
    var c;
    (function (c) {
        c.x.foo();
    })(c = exports.c || (exports.c = {}));
});
