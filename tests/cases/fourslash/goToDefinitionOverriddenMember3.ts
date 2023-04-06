/// <reference path="./fourslash.ts"/>

// @noImplicitOverride: true

////abstract class Foo {
////	abstract /*2*/m() {}
////}
////
////export class Bar extends Foo {
////	[|/*1*/override|] m() {}
////}

verify.baselineGoToDefinition("1");
