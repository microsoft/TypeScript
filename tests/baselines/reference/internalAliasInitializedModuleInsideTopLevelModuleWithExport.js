//// [tests/cases/compiler/internalAliasInitializedModuleInsideTopLevelModuleWithExport.ts] ////

//// [internalAliasInitializedModuleInsideTopLevelModuleWithExport.ts]
export module a {
    export module b {
        export class c {
        }
    }
}

export import b = a.b;
export var x: b.c = new b.c();

//// [internalAliasInitializedModuleInsideTopLevelModuleWithExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.b = exports.a = void 0;
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
exports.b = a.b;
exports.x = new exports.b.c();


//// [internalAliasInitializedModuleInsideTopLevelModuleWithExport.d.ts]
export declare namespace a {
    namespace b {
        class c {
        }
    }
}
export import b = a.b;
export declare var x: b.c;
