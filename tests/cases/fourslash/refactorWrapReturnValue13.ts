/// <reference path='fourslash.ts' />

//// function /*a*/foo/*b*/ (): void {
////     return
//// }
//// foo();

goTo.select("a", "b");
verify.not.refactorAvailable("Wrap return value");
