/// <reference path="./fourslash.ts"/>

// @noImplicitOverride: true

////class A {
////    static /*2*/m() {}
////}
////class B extends A {}
////class C extends B {
////    static [|/*1*/override|] m() {}
////}

verify.baselineGoToDefinition("1");
