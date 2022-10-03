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
    exports.c = exports.a = void 0;
    var a;
    (function (a) {
        var b;
        (function (b) {
            var c = /** @class */ (function () {
                function c() {
                }
                return c;
            }());
            b.c = c;
        })(b = a.b || (a.b = {}));
    })(a = exports.a || (exports.a = {}));
    var c;
    (function (c) {
        c.b = a.b;
        c.x = new c.b.c();
    })(c = exports.c || (exports.c = {}));
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
