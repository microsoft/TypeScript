//// [tests/cases/compiler/commentEmitWithCommentOnLastLine.ts] ////

//// [commentEmitWithCommentOnLastLine.ts]
var x: any;
/*
var bar;
*/

//// [commentEmitWithCommentOnLastLine.js]
"use strict";
var x;
/*
var bar;
*/ 
