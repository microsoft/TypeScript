/// <reference path="./fourslash.ts"/>

// @strict: true
// @target: esnext
// @lib: esnext

//// const prop = "foo" as const;
////
//// abstract class A {
////   readonly /*2*/[prop] = "A";
//// }
////
//// export class B extends A {
////   [|/*1*/override|] readonly [prop] = "B";
//// }

verify.baselineGoToDefinition("1");
