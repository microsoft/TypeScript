/// <reference path="fourslash.ts" />

////const /*a*/x/*b*/ = 0;
////const y = 1 + 2;

goTo.select("a", "b");
verify.not.refactorAvailable("Inline variable");