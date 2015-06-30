/// <reference path="fourslash.ts"/>


// @Filename: navigationItemsModuleVariables_0.ts
//// /*file1*/
////module Module1 {
////    export var x = 0;
////}

// @Filename: navigationItemsModuleVariables_1.ts
//// /*file2*/
////module Module1.SubModule {
////    export var y = 0;
////}

// @Filename: navigationItemsModuleVariables_2.ts
//// /*file3*/
////module Module1 {
////    export var z = 0;
////}
goTo.marker("file1");
verify.getScriptLexicalStructureListContains("Module1", "module");
verify.getScriptLexicalStructureListContains("x", "var");
// nothing else should show up
verify.getScriptLexicalStructureListCount(2);

goTo.marker("file2");
verify.getScriptLexicalStructureListContains("Module1.SubModule", "module");
verify.getScriptLexicalStructureListContains("y", "var");
verify.getScriptLexicalStructureListCount(2);
