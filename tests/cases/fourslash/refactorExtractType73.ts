/// <reference path='fourslash.ts' />

// @Filename: a.ts
////interface Foo<T extends { prop: T }> {}

// @Filename: b.ts
////interface Foo<T extends { prop: /*a*/T/*b*/ }> {}

goTo.file("b.ts");
goTo.select("a", "b");
verify.not.refactorAvailable("Extract type", "Extract to type alias");
