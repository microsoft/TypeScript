//// [tests/cases/compiler/isolatedModulesInEmptyFiles.ts] ////

//// [file.ts]
// Should not error in this file

//// [file2.ts]
// but this file
var a = 1


//// [file.js]
// Should not error in this file
//// [file2.js]
// but this file
var a = 1;
