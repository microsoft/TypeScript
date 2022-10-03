/// <reference path='fourslash.ts' />

//// type A = (v: string | number) => /*a*/v is string/*b*/

goTo.select("a", "b");
verify.not.refactorAvailable("Extract type")
