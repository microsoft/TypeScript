/// <reference path="fourslash.ts" />

// @filename: a.ts
////interface [|/*2*/Foo|] {
////    foo: E.Foo;
////}

// @Filename: b.ts
////enum E {
////    /** {@link /*1*/[|Foo|]} */
////    Foo
////}

verify.baselineGetDefinitionAtPosition("1");
