//// [internalAliasVarInsideLocalModuleWithExport.ts]
export module a {
    export var x = 10;
}

export module c {
    export import b = a.x;
    export var bVal = b;
}


//// [internalAliasVarInsideLocalModuleWithExport.js]
define(["require", "exports"], function(require, exports) {
    (function (a) {
        a.x = 10;
    })(exports.a || (exports.a = {}));
    var a = exports.a;

    (function (c) {
        c.b = a.x;
        c.bVal = b;
    })(exports.c || (exports.c = {}));
    var c = exports.c;
});


////[internalAliasVarInsideLocalModuleWithExport.d.ts]
export declare module a {
    var x: number;
}
export declare module c {
    export import b = a.x;
    var bVal: number;
}
