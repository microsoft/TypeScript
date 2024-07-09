//// [tests/cases/compiler/commentEmitWithCommentOnLastLine.ts] ////

//// [commentEmitWithCommentOnLastLine.ts]
var x: any;
/*
var bar;
*/

//// [commentEmitWithCommentOnLastLine.js]
var x;
/*
var bar;
*/ 
