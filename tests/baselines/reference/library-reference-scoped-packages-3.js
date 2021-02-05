//// [tests/cases/conformance/references/library-reference-scoped-packages-3.ts] ////

//// [index.d.ts]
// @currentDirectory /foo

export const y = 0;

//// [a.ts]
/// <reference types="@beep/boop" />


//// [a.js]
/// <reference types="@beep/boop" />
