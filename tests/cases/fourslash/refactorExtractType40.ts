/// <reference path='fourslash.ts' />

//// type A = (v: string | number) => /*a*/typeof v/*b*/

goTo.select("a", "b");
verify.not.refactorAvailable("Extract type")
