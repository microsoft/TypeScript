/// <reference path="./fourslash.ts"/>

// @noImplicitOverride: true

////class Foo {
////	static /*2*/p = '';
////}
////class Bar extends Foo {
////	static [|/*1*/override|] p = '';
////}

verify.baselineGoToDefinition("1");
