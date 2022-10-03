//// [tests/cases/compiler/emitTopOfFileTripleSlashCommentOnNotEmittedNodeIfRemoveCommentsIsFalse.ts] ////

//// [file0.ts]
var x = 10

//// [file1.ts]
/// <reference path="file0.ts" />
declare var OData: any;

/// <reference path="file0.ts" />
interface F { }




//// [file0.js]
var x = 10;
//// [file1.js]
/// <reference path="file0.ts" />
