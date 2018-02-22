//// [variableDeclarationInnerCommentEmit.ts]
var a = /*some comment*/ null;
var b /*some comment*/ = null;
var /*some comment*/ c = null;

//// [variableDeclarationInnerCommentEmit.js]
var a = /*some comment*/ null;
var b /*some comment*/ = null;
var /*some comment*/ c = null;
