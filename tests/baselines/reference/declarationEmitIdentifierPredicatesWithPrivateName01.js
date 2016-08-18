//// [declarationEmitIdentifierPredicatesWithPrivateName01.ts]

interface I {
    a: number;
}

export function f(x: any): x is I {
    return typeof x.a === "number";
}

//// [declarationEmitIdentifierPredicatesWithPrivateName01.js]
"use strict";
function f(x) {
    return typeof x.a === "number";
}
exports.f = f;
