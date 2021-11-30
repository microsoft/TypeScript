/// <reference path="./fourslash.ts"/>

// @noImplicitOverride: true

////class Foo extends (class {
////    /*2*/m() {}
////}) {
////    [|/*1*/override|] m() {}
////}

verify.goToDefinition("1", "2");
