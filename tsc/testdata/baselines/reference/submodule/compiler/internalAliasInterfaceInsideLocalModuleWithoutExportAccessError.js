//// [tests/cases/compiler/internalAliasInterfaceInsideLocalModuleWithoutExportAccessError.ts] ////

//// [internalAliasInterfaceInsideLocalModuleWithoutExportAccessError.ts]
<<<<<<< HEAD
export module a {
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
export namespace a {
=======
export namespace a {
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
    export interface I {
    }
}

export module c {
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
    var b = a.I;
})(c || (exports.c = c = {}));
var x;
