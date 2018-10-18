/// <reference path="fourslash.ts" />

////class C/*a*/ /*b*/ { }
////class C e/*c*/ {}

// Tests that `isCompletionListBlocker` is true *at* the class name, but false *after* it.

goTo.marker("a");
verify.completionListIsEmpty();

goTo.marker("b");
verify.completionListContains("extends");

goTo.marker("c");
verify.completionListContains("extends");
