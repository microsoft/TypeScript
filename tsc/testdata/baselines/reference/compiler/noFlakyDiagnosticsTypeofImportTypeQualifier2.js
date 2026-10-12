//// [tests/cases/compiler/noFlakyDiagnosticsTypeofImportTypeQualifier2.ts] ////

//// [b.ts]
export const x = 1;

//// [a.ts]
export function f(x: typeof import("./b").nope.x) {}


//// [b.js]
export const x = 1;
//// [a.js]
export function f(x) { }
