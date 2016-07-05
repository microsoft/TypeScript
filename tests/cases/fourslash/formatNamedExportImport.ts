/// <reference path="fourslash.ts"/>

/////*selectionStart*/
////export {   x, y    as     yy, z       }       from        "foo"/*export1*/
////export{x, y as yy, z}from"bar"/*export2*/
////
////export
/////*exportOpenBrace*/{x,/*exportSpecifier1*/
////y as  yy, z/*exportSpecifier2*/ }/*exportCloseBrace*/
////  from/*fromKeywordAutoformat*/
/////*fromKeywordIndent*/
////"foo"/*exportDir*/
////
////import {x, y as yy, z}from   "baz"/*import1*/
////
////import/*importOpenBrace*/{x,/*importSpecifier1*/
////y
////as yy,/*importSpecifier2*/
////z}/*importCloseBrace*/
////from   "wow"/*importDir*/
/////*selectionEnd*/
////
////export/*formatOnEnter*/{/*formatOnEnterOpenBrace*/
/////*differentLineIndent*/x/*differentLineAutoformat*/
////} from "abc"
////
////export {
/////*incompleteExportDeclIndent*/
/////*incompleteExportDeclIndent2*/

format.selection("selectionStart", "selectionEnd");

goTo.marker("export1");
verify.currentLineContentIs('export { x, y as yy, z } from "foo"');
goTo.marker("export2");
verify.currentLineContentIs('export { x, y as yy, z } from "bar"');

goTo.marker("exportOpenBrace");
verify.currentLineContentIs("export {");
goTo.marker("exportSpecifier1");
verify.currentLineContentIs("    x,");
goTo.marker("exportSpecifier2");
verify.currentLineContentIs("    y as yy, z");
goTo.marker("exportCloseBrace");
verify.currentLineContentIs("}");
goTo.marker("fromKeywordAutoformat");
verify.currentLineContentIs("    from");
goTo.marker("fromKeywordIndent");
verify.indentationIs(4);
goTo.marker("exportDir");
verify.currentLineContentIs('    "foo"');

goTo.marker("import1");
verify.currentLineContentIs('import { x, y as yy, z } from "baz"');

goTo.marker("importOpenBrace");
verify.currentLineContentIs("import {");
goTo.marker("importSpecifier1");
verify.currentLineContentIs("    x,");
goTo.marker("importSpecifier2");
verify.currentLineContentIs("        as yy,");
goTo.marker("importCloseBrace");
verify.currentLineContentIs("}");
goTo.marker("importDir");
verify.currentLineContentIs('    from "wow"');

goTo.marker("formatOnEnter");
edit.insertLine('');
goTo.marker("formatOnEnterOpenBrace");
verify.currentLineContentIs("{");
goTo.marker("differentLineIndent");
verify.indentationIs(4);
edit.insertLine('');
goTo.marker("differentLineAutoformat");
verify.currentLineContentIs("    x");

goTo.marker("incompleteExportDeclIndent")
verify.indentationIs(4);
edit.insert("} from");
goTo.marker("incompleteExportDeclIndent2");
verify.indentationIs(4);