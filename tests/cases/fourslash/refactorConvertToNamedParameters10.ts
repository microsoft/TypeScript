/// <reference path='fourslash.ts' />

////const { foo, bar } = { foo: /*a*/(a: number, b: number)/*b*/ => {}, bar: () => {} };
////foo(1, 2);

goTo.select("a", "b");
verify.not.refactorAvailable("Convert to named parameters");
