//// [tests/cases/compiler/internalAliasInterfaceInsideLocalModuleWithExport.ts] ////

//// [internalAliasInterfaceInsideLocalModuleWithExport.ts]
export module a {
    export interface I {
    }
}

export module c {
    export import b = a.I;
    export var x: b;
}


//// [internalAliasInterfaceInsideLocalModuleWithExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
var c;
(function (c) {
    c.b = a.I;
})(c || (exports.c = c = {}));
