//// [uniqueNominalBrandsDeclarations2.ts]
export type Downcased = unique string;

export function downcaseLit<T extends string>(x: T): T & Downcased {
    return x.toLocaleLowerCase() as T & Downcased;
}
const a = "ok";
export const c = downcaseLit(a); // visibility error


//// [uniqueNominalBrandsDeclarations2.js]
"use strict";
exports.__esModule = true;
function downcaseLit(x) {
    return x.toLocaleLowerCase();
}
exports.downcaseLit = downcaseLit;
var a = "ok";
exports.c = downcaseLit(a); // visibility error
