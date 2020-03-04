//// [tests/cases/compiler/importUsedInGenericImportResolves.ts] ////

//// [test1.d.ts]
export interface T<P> {
    a: P;
}

//// [test2.d.ts]
export declare const theme: { a: string }

//// [test3.ts]
export const a: import("./test1").T<typeof import("./test2").theme> = null as any;

//// [test3.js]
"use strict";
exports.__esModule = true;
exports.a = void 0;
exports.a = null;
