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
let a = /*[[${something}]]*/ {};
let b = /*[[${something}]]*/ {};
let c = /*[[${something}]]*/ { hoge: true };
let d /*[[${something}]]*/ = {};
let e /*[[${something}]]*/ = {};
let f = /* comment1 */ d(e);
let g = /* comment2 */ d(e);
