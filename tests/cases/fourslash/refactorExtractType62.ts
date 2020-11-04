/// <reference path='fourslash.ts' />

//// type T = { c: string }
//// function foo(a: /*a*/{ a: number | string, b: string } & T/*b*/) { }

goTo.select("a", "b");
verify.not.refactorAvailable("Extract type", "Extract to interface")
