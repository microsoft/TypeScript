//// [tests/cases/compiler/internalAliasInterfaceInsideLocalModuleWithoutExportAccessError.ts] ////

//// [internalAliasInterfaceInsideLocalModuleWithoutExportAccessError.ts]
export namespace a {
    export interface I {
    }
}

export namespace c {
    import b = a.I;
    export var x: b;
}

var x: c.b;

//// [internalAliasInterfaceInsideLocalModuleWithoutExportAccessError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
var c;
(function (c) {
})(c || (exports.c = c = {}));
var x;
