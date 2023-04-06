/// <reference path="./fourslash.ts"/>

// @noImplicitOverride: true

////interface I {
////    m(): void;
////}
////class A {
////    /*2*/m() {};
////}
////class B extends A implements I {
////   [|/*1*/override|] m() {}
////}

verify.baselineGoToDefinition("1");
