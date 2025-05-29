//// [tests/cases/compiler/internalAliasInterfaceInsideLocalModuleWithoutExport.ts] ////

//// [internalAliasInterfaceInsideLocalModuleWithoutExport.ts]
export module a {
    export interface I {
    }
}

export module c {
    import b = a.I;
    export var x: b;
}


//// [internalAliasInterfaceInsideLocalModuleWithoutExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
var c;
(function (c) {
    var b = a.I;
})(c || (exports.c = c = {}));


//// [internalAliasInterfaceInsideLocalModuleWithoutExport.d.ts]
export declare namespace a {
    interface I {
    }
}
export declare namespace c {
    import b = a.I;
    var x: b;
}
