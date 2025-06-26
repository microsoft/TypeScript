//// [tests/cases/compiler/typeofImportTrailingCommas.ts] ////

//// [input.ts]
export type X = 1;

//// [main.ts]
type T1 = typeof import('./input.js',)
type T2 = typeof import('./input.js', { with: { "resolution-mode": "import" } },);


//// [input.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [main.js]
