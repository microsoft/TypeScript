/// <reference path='fourslash.ts' />

//// type B = { b: string };
//// type C = { c: number };
////
//// interface X<T extends { prop: /*1*/T | B /*2*/| C }> {}

goTo.select("1", "2");
verify.not.refactorAvailable("Extract type");
