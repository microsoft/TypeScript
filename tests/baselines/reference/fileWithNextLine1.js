//// [tests/cases/compiler/fileWithNextLine1.ts] ////

//// [fileWithNextLine1.ts]
// Note: there is a nextline (0x85) in the string
// 0.  It should be counted as a space and should not cause an error.
var v = '';

//// [fileWithNextLine1.js]
// Note: there is a nextline (0x85) in the string
// 0.  It should be counted as a space and should not cause an error.
var v = '';
