//// [tests/cases/compiler/internalAliasVarInsideLocalModuleWithExport.ts] ////

//// [internalAliasVarInsideLocalModuleWithExport.ts]
export module a {
    export var x = 10;
}

export module c {
    export import b = a.x;
    export var bVal = b;
}


//// [internalAliasVarInsideLocalModuleWithExport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = exports.a = void 0;
    var a;
    (function (a) {
        a.x = 10;
    })(a || (exports.a = a = {}));
    var c;
    (function (c) {
        c.b = a.x;
        c.bVal = c.b;
    })(c || (exports.c = c = {}));
});


//// [internalAliasVarInsideLocalModuleWithExport.d.ts]
export declare namespace a {
    var x: number;
}
export declare namespace c {
    export import b = a.x;
    var bVal: number;
}
