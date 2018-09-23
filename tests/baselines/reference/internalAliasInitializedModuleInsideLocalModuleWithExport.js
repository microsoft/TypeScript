//// [internalAliasInitializedModuleInsideLocalModuleWithExport.ts]
export module a {
    export module b {
        export class c {
        }
    }
}

export module c {
    export import b = a.b;
    export var x: b.c = new b.c();
}

//// [internalAliasInitializedModuleInsideLocalModuleWithExport.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var a = {};
    (function (a) {
        var b = a.b || (a.b = {});
        (function (b) {
            var c = /** @class */ (function () {
                function c() {
                }
                return c;
            }());
            b.c = c;
        })(b);
    })(a);
    var c = {};
    (function (c) {
        c.b = a.b;
        c.x = new c.b.c();
    })(c);
});


//// [internalAliasInitializedModuleInsideLocalModuleWithExport.d.ts]
export declare module a {
    module b {
        class c {
        }
    }
}
export declare module c {
    export import b = a.b;
    var x: b.c;
}
