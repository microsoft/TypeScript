//// [tests/cases/compiler/doNotEmitTripleSlashCommentsButPreserveDetachComments2.ts] ////

//// [file0.ts]


//// [file1.ts]

//
// Copy Right comment
//

/// <reference path="file0.ts" />
var x = 10;

//// [file0.js]
//// [file1.js]
//
// Copy Right comment
//
var x = 10;
