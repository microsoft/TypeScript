//// [tests/cases/conformance/declarationEmit/typePredicates/declarationEmitIdentifierPredicatesWithPrivateName01.ts] ////

//// [declarationEmitIdentifierPredicatesWithPrivateName01.ts]
interface I {
    a: number;
}

export function f(x: any): x is I {
    return typeof x.a === "number";
}

//// [declarationEmitIdentifierPredicatesWithPrivateName01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
function f(x) {
    return typeof x.a === "number";
}
exports.f = f;


//// [declarationEmitIdentifierPredicatesWithPrivateName01.d.ts]
interface I {
    a: number;
}
export declare function f(x: any): x is I;
export {};
