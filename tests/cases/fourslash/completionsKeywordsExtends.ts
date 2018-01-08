/// <reference path="fourslash.ts" />

////class C/*a*/ /*b*/ { }

// Tests that `isCompletionListBlocker` is true *at* the class name, but false *after* it.

goTo.marker("a");
verify.completionListIsEmpty();

goTo.marker("b");
verify.completionListContains("extends");
