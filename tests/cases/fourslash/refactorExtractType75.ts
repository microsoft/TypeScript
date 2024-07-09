/// <reference path='fourslash.ts' />

// @Filename: a.ts
//// interface Foo<T extends { prop: T }> {}
//// interface Foo<T extends { prop: /*a*/T/*b*/ }> {}

goTo.file("a.ts");
goTo.select("a", "b");
verify.not.refactorAvailable("Extract type", "Extract to type alias");
