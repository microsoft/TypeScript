//// [internalAliasInitializedModuleInsideLocalModuleWithoutExportAccessError.ts]
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

export var d = new c.b.c();

//// [internalAliasInitializedModuleInsideLocalModuleWithoutExportAccessError.js]
"use strict";
exports.__esModule = true;
exports.d = exports.c = exports.a = void 0;
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
    var b = a.b;
    c.x = new b.c();
})(c = exports.c || (exports.c = {}));
exports.d = new c.b.c();
