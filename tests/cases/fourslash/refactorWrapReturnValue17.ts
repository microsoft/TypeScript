/// <reference path='fourslash.ts' />

//// function /*a*/foo/*b*/ (node: unknown): node is number {
////     return true
//// }
//// foo();

goTo.select("a", "b");
verify.not.refactorAvailable("Wrap return value");
