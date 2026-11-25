//// [tests/cases/compiler/selfReferencingFileWithoutExtension.ts] ////

//// [a.ts]
/// <reference path="a" />
export const a = 1;


//// [a.js]
/// <reference path="a" />
export const a = 1;
