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
exports.x = exports.a = void 0;
var a;
(function (a) {
    let b;
    (function (b) {
        class c {
        }
        b.c = c;
    })(b = a.b || (a.b = {}));
})(a || (exports.a = a = {}));
exports.x = new exports.b.c();
