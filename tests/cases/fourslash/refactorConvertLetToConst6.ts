/// <reference path='fourslash.ts' />

//// /*a*/let a = 1, b = 2;/*b*/
//// a = 2;

goTo.select("a", "b");
verify.not.refactorAvailable("Convert 'let' to 'const'");
