/// <reference path="fourslash.ts"/>


/////**/

goTo.marker();
edit.insertLine("module A");
edit.insert("export class ");

// should not crash
verify.getScriptLexicalStructureListCount(2);

