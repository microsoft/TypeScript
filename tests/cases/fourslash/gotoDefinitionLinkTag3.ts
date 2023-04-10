/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////enum E {
////    /** {@link /*1*/[|Foo|]} */
////    Foo
////}
////interface [|/*2*/Foo|] {
////    foo: E.Foo;
////}

goTo.marker("1");
verify.goToDefinitionIs("2");
