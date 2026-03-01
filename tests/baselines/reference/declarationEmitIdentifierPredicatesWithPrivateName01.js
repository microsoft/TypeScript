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
exports.f = f;
function f(x) {
    return typeof x.a === "number";
}


//// [declarationEmitIdentifierPredicatesWithPrivateName01.d.ts]
interface I {
    a: number;
}
export declare function f(x: any): x is I;
export {};
