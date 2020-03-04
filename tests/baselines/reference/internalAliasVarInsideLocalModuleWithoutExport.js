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
    exports.c = exports.a = void 0;
    var a;
    (function (a) {
        a.x = 10;
    })(a = exports.a || (exports.a = {}));
    var c;
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
