//// [tests/cases/compiler/internalAliasFunctionInsideTopLevelModuleWithoutExport.ts] ////

//// [internalAliasFunctionInsideTopLevelModuleWithoutExport.ts]
export module a {
    export function foo(x: number) {
        return x;
    }
}

import b = a.foo;
export var bVal = b(10);
export var bVal2 = b;


//// [internalAliasFunctionInsideTopLevelModuleWithoutExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bVal2 = exports.bVal = exports.a = void 0;
var a;
(function (a) {
    function foo(x) {
        return x;
    }
    a.foo = foo;
})(a || (exports.a = a = {}));
var b = a.foo;
exports.bVal = b(10);
exports.bVal2 = b;


//// [internalAliasFunctionInsideTopLevelModuleWithoutExport.d.ts]
export declare namespace a {
    function foo(x: number): number;
}
import b = a.foo;
export declare var bVal: number;
export declare var bVal2: typeof b;
