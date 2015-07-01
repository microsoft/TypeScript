/// <reference path="fourslash.ts"/>

////class Test {
////    constructor() {
////    }
////}

verify.getScriptLexicalStructureListContains("Test", "class");
verify.getScriptLexicalStructureListContains("constructor", "constructor");

// no other items
verify.getScriptLexicalStructureListCount(2);