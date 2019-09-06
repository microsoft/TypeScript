//// [structuralTagTypesDeclarations.ts]
export type Downcased = string & tag {downcased: void};

export function downcaseLit<T extends string>(x: T): T & Downcased {
    return x.toLocaleLowerCase() as T & Downcased;
}
const a = "ok";
export const c = downcaseLit(a); // no visibility error, tag reproduced structurally


//// [structuralTagTypesDeclarations.js]
"use strict";
exports.__esModule = true;
function downcaseLit(x) {
    return x.toLocaleLowerCase();
}
exports.downcaseLit = downcaseLit;
var a = "ok";
exports.c = downcaseLit(a); // no visibility error, tag reproduced structurally


//// [structuralTagTypesDeclarations.d.ts]
export declare type Downcased = string & tag {
    downcased: void;
};
export declare function downcaseLit<T extends string>(x: T): T & Downcased;
export declare const c: "ok" & tag {
    downcased: void;
};
