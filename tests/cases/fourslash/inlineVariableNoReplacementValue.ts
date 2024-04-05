/// <reference path="fourslash.ts" />

////let /*a*/x/*b*/;
////const y = x + 1;

goTo.select("a", "b");
verify.not.refactorAvailable("Inline variable");