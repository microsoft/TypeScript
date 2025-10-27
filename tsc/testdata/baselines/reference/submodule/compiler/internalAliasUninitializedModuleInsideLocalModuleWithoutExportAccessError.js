//// [tests/cases/compiler/internalAliasUninitializedModuleInsideLocalModuleWithoutExportAccessError.ts] ////

//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExportAccessError.ts]
<<<<<<< HEAD
export module a {
    export module b {
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
export namespace a {
    export namespace b {
=======
export namespace a {
    export namespace b {
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
        export interface I {
            foo();
        }
    }
}

export module c {
    import b = a.b;
    export var x: b.I;
    x.foo();
}


export var z: c.b.I;

//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExportAccessError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = exports.c = void 0;
var c;
(function (c) {
    var b = a.b;
    c.x.foo();
})(c || (exports.c = c = {}));
