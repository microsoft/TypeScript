//// [tests/cases/compiler/noFlakyDiagnosticsTypeofImportTypeQualifier1.ts] ////

//// [noFlakyDiagnosticsTypeofImportTypeQualifier1.ts]
export function f(x: typeof import("foo").sys.readDirectory) {}


//// [noFlakyDiagnosticsTypeofImportTypeQualifier1.js]
export function f(x) { }
