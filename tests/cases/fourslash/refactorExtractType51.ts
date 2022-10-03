/// <reference path='fourslash.ts' />

//// interface I { f: (this: O, b: number) => /*a*/this/*b*/ };

goTo.select("a", "b");
verify.not.refactorAvailable("Extract type")
