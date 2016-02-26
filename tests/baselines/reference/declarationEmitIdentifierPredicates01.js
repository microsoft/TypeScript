//// [declarationEmitIdentifierPredicates01.ts]

export function f(x: any): x is number {
    return typeof x === "number";
}

//// [declarationEmitIdentifierPredicates01.js]
"use strict";
function f(x) {
    return typeof x === "number";
}
exports.f = f;


//// [declarationEmitIdentifierPredicates01.d.ts]
export declare function f(x: any): x is number;
