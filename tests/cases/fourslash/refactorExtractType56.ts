/// <reference path='fourslash.ts' />

// typeof other parameters within function signature?
//// function f(a: string, b: /*a*/typeof a/*b*/): typeof b { return ''; }

goTo.select("a", "b");
verify.not.refactorAvailable("Extract type")
