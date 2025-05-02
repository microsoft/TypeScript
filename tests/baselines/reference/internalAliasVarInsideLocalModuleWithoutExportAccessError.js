//// [tests/cases/compiler/internalAliasVarInsideLocalModuleWithoutExportAccessError.ts] ////

//// [internalAliasVarInsideLocalModuleWithoutExportAccessError.ts]
export module a {
    export var x = 10;
}

export module c {
    import b = a.x;
    export var bVal = b;
}

export var z = c.b;

//// [internalAliasVarInsideLocalModuleWithoutExportAccessError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.c = exports.a = void 0;
var a;
(function (a) {
    a.x = 10;
})(a || (exports.a = a = {}));
var c;
(function (c) {
    var b = a.x;
    c.bVal = b;
})(c || (exports.c = c = {}));
exports.z = c.b;
