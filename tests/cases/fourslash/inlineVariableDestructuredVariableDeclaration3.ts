/// <reference path="fourslash.ts" />

////function f() {
////    const a = { prop: 123 };
////    const { prop } = /*a*/a/*b*/;
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Inline variable");
