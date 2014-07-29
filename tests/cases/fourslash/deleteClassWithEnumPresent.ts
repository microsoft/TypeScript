///<reference path="fourslash.ts"/>

////enum Foo { a, b, c }
/////**/class Bar { }

goTo.marker();
edit.deleteAtCaret('class Bar { }'.length);
verify.getScriptLexicalStructureListContains('Foo', 'enum', 'tests/cases/fourslash/deleteClassWithEnumPresent.ts', '');