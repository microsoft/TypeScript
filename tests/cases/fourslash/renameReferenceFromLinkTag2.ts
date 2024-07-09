/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////enum E {
////    /** {@link /**/Foo} */
////    Foo
////}
////interface Foo {
////    foo: E.Foo;
////}

verify.baselineRename("", {});
