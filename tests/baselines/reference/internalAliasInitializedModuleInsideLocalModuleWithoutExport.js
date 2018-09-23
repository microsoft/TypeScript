//// [internalAliasInitializedModuleInsideLocalModuleWithoutExport.ts]
export module a {
    export module b {
        export class c {
        }
    }
}

export module c {
    import b = a.b;
    export var x: b.c = new b.c();
}

//// [internalAliasInitializedModuleInsideLocalModuleWithoutExport.js]
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
    var b = a.b;
    c.x = new b.c();
})(c);


//// [internalAliasInitializedModuleInsideLocalModuleWithoutExport.d.ts]
export declare module a {
    module b {
        class c {
        }
    }
}
export declare module c {
    import b = a.b;
    var x: b.c;
}
