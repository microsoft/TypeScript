/// <reference path="../fourslash.ts"/>

////class Foo {
////}
////module Foo {
////    export var x: number;
////}
////Foo./**/

goTo.marker("");
verify.completionListContains("x");

// Make an edit
edit.insert("a");
edit.backspace();

// Checking for completion details after edit should work too
verify.completionEntryDetailIs("x", "var Foo.x: number");
