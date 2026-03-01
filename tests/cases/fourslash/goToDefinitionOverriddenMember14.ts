/// <reference path="./fourslash.ts"/>

// @noImplicitOverride: true

////class A {
////    /*2*/m() {}
////}
////class B extends A {}
////class C extends B {
////    [|/*1*/override|] m() {}
////}

verify.baselineGoToDefinition("1");
