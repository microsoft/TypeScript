//// [tests/cases/compiler/emitOneLineVariableDeclarationRemoveCommentsFalse.ts] ////

//// [emitOneLineVariableDeclarationRemoveCommentsFalse.ts]
let a = /*[[${something}]]*/ {};
let b: any = /*[[${something}]]*/ {};
let c: { hoge: boolean } = /*[[${something}]]*/ { hoge: true };
let d: any  /*[[${something}]]*/ = {};
let e/*[[${something}]]*/: any   = {};
let f = /* comment1 */ d(e);
let g: any = /* comment2 */ d(e);


//// [emitOneLineVariableDeclarationRemoveCommentsFalse.js]
var a = /*[[${something}]]*/ {};
var b = /*[[${something}]]*/ {};
var c = /*[[${something}]]*/ { hoge: true };
var d /*[[${something}]]*/ = {};
var e /*[[${something}]]*/ = {};
var f = /* comment1 */ d(e);
var g = /* comment2 */ d(e);
