/// <reference path="fourslash.ts" />

////const /*a1*/foo/*b1*/ = "foo";
////type /*a2*/foo/*b2*/ = string;
////type bar = foo;

goTo.select("a1", "b1");
verify.not.refactorAvailable("Inline variable");

goTo.select("a2", "b2");
verify.not.refactorAvailable("Inline variable");