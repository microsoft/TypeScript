/// <reference path='fourslash.ts' />

// @Filename: a.ts
////function /*a*/gen<T extends any[]>/*b*/(a: boolean, ...b: T): T {
////    return b;
////}
////gen(false);
////gen(false, 1);
////gen(true, 1, "two");

// @Filename: b.ts
////function /*c*/un/*d*/(a: boolean, ...b: number[] | [string, string]) {
////    return b;
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Convert parameters to destructured object");

goTo.select("c", "d");
verify.not.refactorAvailable("Convert parameters to destructured object");