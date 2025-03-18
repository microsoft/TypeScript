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
let a = {};
let b = {};
let c = { hoge: true };
let d = {};
let e = {};
let f = d(e);
let g = d(e);
