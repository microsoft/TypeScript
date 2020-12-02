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
exports.__esModule = true;
exports.c = void 0;
var c;
(function (c) {
    c.x.foo();
})(c = exports.c || (exports.c = {}));


//// [internalAliasUninitializedModuleInsideLocalModuleWithoutExport.d.ts]
export declare module a {
    module b {
        interface I {
            foo(): any;
        }
    }
}
export declare module c {
    import b = a.b;
    var x: b.I;
}
