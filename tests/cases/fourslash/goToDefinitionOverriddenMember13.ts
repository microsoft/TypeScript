/// <reference path="./fourslash.ts"/>

// @noImplicitOverride: true

////class Foo {
////	static /*2*/m() {}
////}
////class Bar extends Foo {
////	static [|/*1*/override|] m() {}
////}

verify.baselineGoToDefinition("1");
