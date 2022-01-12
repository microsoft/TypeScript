//// [emitOneLineVariableDeclarationRemoveCommentsFalse.ts]
let a = /*[[${something}]]*/ {};
let b: any = /*[[${something}]]*/ {};
let c: { hoge: boolean } = /*[[${something}]]*/ { hoge: true };
let d: any  /*[[${something}]]*/ = {};
let e/*[[${something}]]*/: any   = {};


//// [emitOneLineVariableDeclarationRemoveCommentsFalse.js]
var a = /*[[${something}]]*/ {};
var b = /*[[${something}]]*/ {};
var c = /*[[${something}]]*/ { hoge: true };
var d /*[[${something}]]*/ = {};
var e /*[[${something}]]*/ = {};
