//// [internalAliasInterfaceInsideLocalModuleWithoutExportAccessError.ts]
export module a {
    export interface I {
    }
}

export module c {
    import b = a.I;
    export var x: b;
}

var x: c.b;

//// [internalAliasInterfaceInsideLocalModuleWithoutExportAccessError.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.c = void 0;
    var c;
    (function (c) {
    })(c = exports.c || (exports.c = {}));
    var x;
});
