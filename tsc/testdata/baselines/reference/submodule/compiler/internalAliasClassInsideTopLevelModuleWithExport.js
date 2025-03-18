//// [tests/cases/compiler/internalAliasClassInsideTopLevelModuleWithExport.ts] ////

//// [internalAliasClassInsideTopLevelModuleWithExport.ts]
export module x {
    export class c {
        foo(a: number) {
            return a;
        }
    }
}

export import xc = x.c;
export var cProp = new xc();
var cReturnVal = cProp.foo(10);

//// [internalAliasClassInsideTopLevelModuleWithExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cProp = exports.x = void 0;
var x;
(function (x) {
    class c {
        foo(a) {
            return a;
        }
    }
    x.c = c;
})(x || (exports.x = x = {}));
exports.cProp = new exports.xc();
var cReturnVal = exports.cProp.foo(10);
