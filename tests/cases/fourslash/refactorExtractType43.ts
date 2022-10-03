/// <reference path='fourslash.ts' />

//// type A = (v: string | number) => /*a*/number | typeof v/*b*/

goTo.select("a", "b");
verify.not.refactorAvailable("Extract type")
