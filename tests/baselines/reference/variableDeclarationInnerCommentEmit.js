//// [variableDeclarationInnerCommentEmit.ts]
var a = /*some comment*/ null;
var b /*some comment*/ = null;
var /*some comment*/ c = null;

// no space
var a=/*some comment*/null;

//// [variableDeclarationInnerCommentEmit.js]
var a = /*some comment*/ null;
var b /*some comment*/ = null;
var /*some comment*/ c = null;
// no space
var a = /*some comment*/ null;
