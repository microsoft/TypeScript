/// <reference path="fourslash.ts" />

////for (let /*a*/i/*b*/ = 0; i < 5; i++) {
////    console.log(i)
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Inline variable");