/// <reference path='fourslash.ts' />

////const foo: (a: number, b: number) => number = /*a*/(a: number, b: number)/*b*/ => a + b;
////foo(1, 2);

goTo.select("a", "b");
verify.not.refactorAvailable("Convert parameters to destructured object");
