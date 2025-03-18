//// [tests/cases/compiler/tripleSlashReferenceAbsoluteWindowsPath.ts] ////

//// [c.ts]
const x = 5;

//// [d.ts]
/// <reference path="C:\a\b\c.ts" />
const y = x + 3;

//// [c.js]
const x = 5;
//// [d.js]
const y = x + 3;
