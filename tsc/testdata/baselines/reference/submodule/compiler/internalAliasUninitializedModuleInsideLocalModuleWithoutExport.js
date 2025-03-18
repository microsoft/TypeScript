//// [tests/cases/compiler/internalAliasUninitializedModuleInsideLocalModuleWithoutExport.ts] ////

//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExport.ts]
export module a {
    export module b {
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

//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
var c;
(function (c) {
    var b = a.b;
    c.x.foo();
})(c || (exports.c = c = {}));
