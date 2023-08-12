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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.c = void 0;
    var c;
    (function (c) {
    })(c || (exports.c = c = {}));
});


//// [internalAliasInterfaceInsideLocalModuleWithExport.d.ts]
export declare namespace a {
    interface I {
    }
}
export declare namespace c {
    export import b = a.I;
    var x: b;
}
