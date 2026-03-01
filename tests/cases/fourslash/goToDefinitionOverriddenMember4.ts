/// <reference path="./fourslash.ts"/>

// @noImplicitOverride: true

////class Foo {
////    /*2*/m() {}
////}
////function f () {
////    return class extends Foo {
////        [|/*1*/override|] m() {}
////    }
////}

verify.baselineGoToDefinition("1");

