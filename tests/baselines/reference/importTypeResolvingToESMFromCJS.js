//// [tests/cases/compiler/importTypeResolvingToESMFromCJS.ts] ////

//// [types.d.mts]
export interface A {}

//// [main.cts]
type A = import("./types.mjs").A;


//// [main.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
