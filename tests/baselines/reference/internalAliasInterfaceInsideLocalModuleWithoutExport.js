//// [internalAliasInterfaceInsideLocalModuleWithoutExport.ts]
export module a {
    export interface I {
    }
}

export module c {
    import b = a.I;
    export var x: b;
}


//// [internalAliasInterfaceInsideLocalModuleWithoutExport.js]
define(["require", "exports"], function(require, exports) {
    (function (c) {
        c.x;
    })(exports.c || (exports.c = {}));
    var c = exports.c;
});


////[internalAliasInterfaceInsideLocalModuleWithoutExport.d.ts]
export declare module a {
    interface I {
    }
}
export declare module c {
    var x: a.I;
}
