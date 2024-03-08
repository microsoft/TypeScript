//// [tests/cases/conformance/declarationEmit/typePredicates/declarationEmitIdentifierPredicates01.ts] ////

//// [declarationEmitIdentifierPredicates01.ts]
export function f(x: any): x is number {
    return typeof x === "number";
}

//// [declarationEmitIdentifierPredicates01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f(x) {
    return typeof x === "number";
}


//// [declarationEmitIdentifierPredicates01.d.ts]
export declare function f(x: any): x is number;
