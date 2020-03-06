/// <reference path='fourslash.ts' />

////var foo = /*a*/(a: number, b: number)/*b*/ => {};
////foo(1, 2);

goTo.select("a", "b");
verify.not.refactorAvailable("Convert parameters to destructured object");
