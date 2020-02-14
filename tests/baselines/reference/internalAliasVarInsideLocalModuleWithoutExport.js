//// [internalAliasVarInsideLocalModuleWithoutExport.ts]
export module a {
    export var x = 10;
}

export module c {
    import b = a.x;
    export var bVal = b;
}


//// [internalAliasVarInsideLocalModuleWithoutExport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var a;
    exports.a = undefined;
    (function (a) {
        a.x = 10;
    })(a = exports.a || (exports.a = {}));
    var c;
    exports.c = undefined;
    (function (c) {
        var b = a.x;
        c.bVal = b;
    })(c = exports.c || (exports.c = {}));
});


//// [internalAliasVarInsideLocalModuleWithoutExport.d.ts]
export declare module a {
    var x: number;
}
export declare module c {
    var bVal: number;
}
