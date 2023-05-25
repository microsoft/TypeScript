/// <reference path="fourslash.ts" />

////const foo/*a*/ = "foo";
////type foo/*b*/ = string;
////type bar = foo;

goTo.marker("a");
verify.not.refactorAvailable("Inline variable");

goTo.marker("b");
verify.not.refactorAvailable("Inline variable");