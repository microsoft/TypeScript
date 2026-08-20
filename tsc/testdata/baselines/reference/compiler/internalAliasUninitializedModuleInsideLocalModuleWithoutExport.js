//// [tests/cases/compiler/internalAliasUninitializedModuleInsideLocalModuleWithoutExport.ts] ////

//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExport.ts]
export namespace a {
    export namespace b {
        export interface I {
            foo();
        }
    }
}

export namespace c {
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
    c.x.foo();
})(c || (exports.c = c = {}));


//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExport.d.ts]
export declare namespace a {
    namespace b {
        interface I {
            foo(): any;
        }
    }
}
export declare namespace c {
    import b = a.b;
    var x: b.I;
}
