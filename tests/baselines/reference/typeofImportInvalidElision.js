//// [tests/cases/compiler/typeofImportInvalidElision.ts] ////

//// [input.ts]
export type X = 1;

//// [main.ts]
type T2 = typeof import('./input.js', ,);


//// [input.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [main.js]
