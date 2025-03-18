//// [tests/cases/compiler/internalAliasUninitializedModuleInsideLocalModuleWithExport.ts] ////

//// [internalAliasUninitializedModuleInsideLocalModuleWithExport.ts]
export module a {
    export module b {
        export interface I {
            foo();
        }
    }
}

export module c {
    export import b = a.b;
    export var x: b.I;
    x.foo();
}

//// [internalAliasUninitializedModuleInsideLocalModuleWithExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
var c;
(function (c) {
    c.b = a.b;
    c.x.foo();
})(c || (exports.c = c = {}));
