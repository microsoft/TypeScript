/// <reference path="fourslash.ts" />

////const /*a*/x/*b*/ = 0;
////const y = x++ + 1;

goTo.select("a", "b");
verify.not.refactorAvailable("Inline variable");