//// [tests/cases/compiler/internalAliasVarInsideLocalModuleWithoutExport.ts] ////

//// [internalAliasVarInsideLocalModuleWithoutExport.ts]
export module a {
    export var x = 10;
}

export module c {
    import b = a.x;
    export var bVal = b;
}


//// [internalAliasVarInsideLocalModuleWithoutExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = exports.a = void 0;
var a;
(function (a) {
    a.x = 10;
})(a || (exports.a = a = {}));
var c;
(function (c) {
    var b = a.x;
    c.bVal = b;
})(c || (exports.c = c = {}));
