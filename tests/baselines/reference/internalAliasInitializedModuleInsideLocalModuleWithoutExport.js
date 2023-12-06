//// [tests/cases/compiler/internalAliasInitializedModuleInsideLocalModuleWithoutExport.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
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
})(a || (exports.a = a = {}));
var c;
(function (c) {
    var b = a.b;
    c.x = new b.c();
})(c || (exports.c = c = {}));


//// [internalAliasInitializedModuleInsideLocalModuleWithoutExport.d.ts]
export declare namespace a {
    namespace b {
        class c {
        }
    }
}
export declare namespace c {
    import b = a.b;
    var x: b.c;
}
