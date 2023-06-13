/// <reference path="fourslash.ts" />

////const /*a*/foo/*b*/ = () => foo();

goTo.select("a", "b");
verify.not.refactorAvailable("Inline variable");