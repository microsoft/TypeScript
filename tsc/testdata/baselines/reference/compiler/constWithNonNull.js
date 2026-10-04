//// [tests/cases/compiler/constWithNonNull.ts] ////

//// [constWithNonNull.ts]
// Fixes #21848

declare const x: number | undefined;
x!++;


//// [constWithNonNull.js]
"use strict";
// Fixes #21848
x++;
