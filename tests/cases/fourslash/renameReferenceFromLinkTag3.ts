/// <reference path="fourslash.ts" />

// @filename: a.ts
////interface Foo {
////    foo: E.Foo;
////}

// @Filename: b.ts
////enum E {
////    /** {@link /**/Foo} */
////    Foo
////}

verify.baselineRename("", {});
