/// <reference path='fourslash.ts'/>

////import { /*1*/ } from "./test";  // no snippets in imports
////var test = "/*2*/"; // no snippets in strings
/////*3*/class A { // insert snippets
////    foo(): string { return ''; }
////}
////
////class /*4*/B extends A { // no snippets after class keyword
////    bar(): string {
//// /*5*/ // insert snippets
////        return '';
////    }
////}
////
////class C</*6*/ U extends A, T extends A> { // no snippets at beginning of generics
////    x: U;
////    y = this./*7*/x; // no snippets inserted for member completions
////   /*8*/ // insert snippets
////}
/////*9*/ // insert snippets
goTo.marker("1");
verify.isValidSnippetInsertionAtPosition(false);
goTo.marker("2");
verify.isValidSnippetInsertionAtPosition(false);
goTo.marker("3");
verify.isValidSnippetInsertionAtPosition(true);
goTo.marker("4");
verify.isValidSnippetInsertionAtPosition(false);
goTo.marker("5");
verify.isValidSnippetInsertionAtPosition(true);
goTo.marker("6");
verify.isValidSnippetInsertionAtPosition(false);
goTo.marker("7");
verify.isValidSnippetInsertionAtPosition(false);
goTo.marker("8");
verify.isValidSnippetInsertionAtPosition(true);
goTo.marker("9");
verify.isValidSnippetInsertionAtPosition(true);