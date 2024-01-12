/// <reference path="fourslash.ts" />

////const/*a*/ /*b*/x/*c*/ = /*d*/1;
////const y = x + 2;

goTo.marker("a");
verify.not.refactorAvailable("Inline variable");

goTo.marker("b");
verify.refactorAvailable("Inline variable");

goTo.marker("c");
verify.refactorAvailable("Inline variable");

goTo.marker("d");
verify.not.refactorAvailable("Inline variable");
