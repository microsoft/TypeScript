//// [internalAliasVarInsideLocalModuleWithoutExport.ts]
export module a {
    export var x = 10;
}

export module c {
    import b = a.x;
    export var bVal = b;
}


//// [internalAliasVarInsideLocalModuleWithoutExport.js]
define(["require", "exports"], function(require, exports) {
    (function (a) {
        a.x = 10;
    })(exports.a || (exports.a = {}));
    var a = exports.a;

    (function (c) {
        var b = a.x;
        c.bVal = b;
    })(exports.c || (exports.c = {}));
    var c = exports.c;
});


////[internalAliasVarInsideLocalModuleWithoutExport.d.ts]
export declare module a {
    var x: number;
}
export declare module c {
    var bVal: number;
}
