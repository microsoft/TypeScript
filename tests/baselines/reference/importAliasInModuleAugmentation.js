//// [tests/cases/compiler/importAliasInModuleAugmentation.ts] ////

//// [importAliasInModuleAugmentation.ts]
export { }

namespace A {
    export const y = 34;
    export interface y { s: string }
}

declare global {
    export import x = A.y;

    // Should still error
    import f = require("fs");
}

const m: number = x;
let s: x = { s: "" };
void s.s;

//// [importAliasInModuleAugmentation.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var A;
(function (A) {
    A.y = 34;
})(A || (A = {}));
var m = x;
var s = { s: "" };
void s.s;
