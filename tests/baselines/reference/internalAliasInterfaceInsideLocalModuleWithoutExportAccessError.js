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
    var c;
    (function (c) {
        c.x;
    })(c = exports.c || (exports.c = {}));
    var x;
});
