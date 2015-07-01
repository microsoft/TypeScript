/// <reference path="fourslash.ts"/>
// @Filename: scriptLexicalStructureItemsContainsNoAnonymouseFunctions_0.ts
/////*file1*/
////(function() {
////    // this should not be included
////    var x = 0;
////
////    // this should not be included either
////    function foo() {
////
////    }
////})();
////
// @Filename: scriptLexicalStructureItemsContainsNoAnonymouseFunctions_1.ts
/////*file2*/
////var x = function() {
////    // this should not be included
////    var x = 0;
////
////    // this should not be included either
////    function foo() {
////};
////
// @Filename: scriptLexicalStructureItemsContainsNoAnonymouseFunctions_2.ts
////// Named functions should still show up
/////*file3*/
////function foo() {
////}
////function bar() {
////}

goTo.marker("file1");
verify.getScriptLexicalStructureListCount(0);

goTo.marker("file2");
verify.getScriptLexicalStructureListContains("<global>", "module");
verify.getScriptLexicalStructureListContains("x", "var");
verify.getScriptLexicalStructureListCount(2);

goTo.marker("file3");
verify.getScriptLexicalStructureListContains("<global>", "module");
verify.getScriptLexicalStructureListContains("foo", "function");
verify.getScriptLexicalStructureListContains("bar", "function");
verify.getScriptLexicalStructureListCount(5);