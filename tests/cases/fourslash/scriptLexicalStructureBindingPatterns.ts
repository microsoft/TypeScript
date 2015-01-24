/// <reference path='fourslash.ts'/> 
////'use strict'
////var foo, {}
////var bar, []
////let foo1, {a, b}
////const bar1, [c, d]
////var {e, x: [f, g]} = {a:1, x:[]};

verify.getScriptLexicalStructureListCount(12); // global (1) + variable declarations (4) + binding patterns (7)
verify.getScriptLexicalStructureListContains("foo", "var");
verify.getScriptLexicalStructureListContains("bar", "var");
verify.getScriptLexicalStructureListContains("foo1", "let")
verify.getScriptLexicalStructureListContains("a", "let");
verify.getScriptLexicalStructureListContains("b", "let");
verify.getScriptLexicalStructureListContains("bar1", "const");
verify.getScriptLexicalStructureListContains("c", "const");
verify.getScriptLexicalStructureListContains("d", "const");
verify.getScriptLexicalStructureListContains("e", "var");
verify.getScriptLexicalStructureListContains("f", "var");
verify.getScriptLexicalStructureListContains("g", "var");

