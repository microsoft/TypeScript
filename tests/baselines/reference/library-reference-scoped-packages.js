//// [tests/cases/conformance/references/library-reference-scoped-packages.ts] ////

//// [index.d.ts]
export const y = 0;

//// [a.ts]
/// <reference types="@beep/boop" />


//// [a.js]
"use strict";
/// <reference types="@beep/boop" />
