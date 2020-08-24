/// <reference path='fourslash.ts' />

//// let a = 1, /*a*/ { toLowerCase: { call } } /*b*/ = ""
//// call = String.call;

goTo.select("a", "b");
verify.not.refactorAvailable("Convert 'let' to 'const'");
