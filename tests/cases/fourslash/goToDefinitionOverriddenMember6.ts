/// <reference path="./fourslash.ts"/>

// @noImplicitOverride: true

////class Foo {
////    m() {}
////}
////class Bar extends Foo {
////    [|/*1*/override|] m1() {}
////}

verify.goToDefinition("1", []);
