/// <reference path='fourslash.ts' />

//// interface I { f: (this: O, b: number) => /*a*/ true | this | false /*b*/ };

goTo.select("a", "b");
verify.not.refactorAvailable("Extract type")