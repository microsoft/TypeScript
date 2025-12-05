/// <reference path="./fourslash.ts"/>

// @strict: true
// @target: esnext
// @lib: esnext

//// const prop: symbol = Symbol();
////
//// abstract class A {}
////
//// export class B extends A {
////   static [|/*1*/override|] [prop]() {}
//// }

verify.baselineGoToDefinition("1");
