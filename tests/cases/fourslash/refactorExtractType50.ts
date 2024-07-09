/// <reference path='fourslash.ts' />

//// interface I { f: (this: O, b: number) => /*a*/typeof this.a/*b*/ };

goTo.select("a", "b");
verify.not.refactorAvailable("Extract type")
