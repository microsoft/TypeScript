/// <reference path="fourslash.ts"/>

////class List<T> {
////    constructor(public a: boolean, public b: T, c: number) {
////        var local = 0;
////    }
////}

verify.getScriptLexicalStructureListContains("List", "class");
verify.getScriptLexicalStructureListContains("constructor", "constructor");
verify.getScriptLexicalStructureListContains("a", "property");
verify.getScriptLexicalStructureListContains("b", "property");

// no other items
verify.getScriptLexicalStructureListCount(4);