//// [tests/cases/compiler/variableDeclarationInnerCommentEmit.ts] ////

//// [variableDeclarationInnerCommentEmit.ts]
var a = /*some comment*/ null;
var b /*some comment*/ = null;
var /*some comment*/ c = null;

// no space
var a=/*some comment*/null;

//// [variableDeclarationInnerCommentEmit.js]
"use strict";
var a = /*some comment*/ null;
var b /*some comment*/ = null;
var /*some comment*/ c = null;
// no space
var a = /*some comment*/ null;
