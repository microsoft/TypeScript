//// [tests/cases/compiler/neverIndexSignatureNotDuplicate.ts] ////

//// [neverIndexSignatureNotDuplicate.ts]
// `never` distributes to no types, so these aren't duplicate index signatures.
interface I {
    [k: never]: string;
    [k: never]: number;
}


//// [neverIndexSignatureNotDuplicate.js]
"use strict";
