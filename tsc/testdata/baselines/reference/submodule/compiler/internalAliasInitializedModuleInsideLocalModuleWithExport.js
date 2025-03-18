//// [tests/cases/compiler/internalAliasInitializedModuleInsideLocalModuleWithExport.ts] ////

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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = exports.a = void 0;
var a;
(function (a) {
    let b;
    (function (b) {
        class c {
        }
        b.c = c;
    })(b = a.b || (a.b = {}));
})(a || (exports.a = a = {}));
var c;
(function (c) {
    c.b = a.b;
    c.x = new c.b.c();
})(c || (exports.c = c = {}));
