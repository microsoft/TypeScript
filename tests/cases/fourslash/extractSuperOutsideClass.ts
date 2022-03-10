/// <reference path='fourslash.ts' />

/////*a*/super()/*b*/

goTo.select("a", "b");
verify.not.refactorAvailable("Extract Symbol");
