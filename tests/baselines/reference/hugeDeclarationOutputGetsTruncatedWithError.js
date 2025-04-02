//// [tests/cases/compiler/hugeDeclarationOutputGetsTruncatedWithError.ts] ////

//// [hugeDeclarationOutputGetsTruncatedWithError.ts]
type props = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

type manyprops = `${props}${props}`;

export const c = [null as any as {[K in manyprops]: {[K2 in manyprops]: `${K}.${K2}`}}][0];

//// [hugeDeclarationOutputGetsTruncatedWithError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = [null][0];
