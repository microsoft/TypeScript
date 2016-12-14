/// <reference path='fourslash.ts' />

//// abstract class A {
////     abstract x: number;
////     private y: number;
////     protected z: number;
////     public w: number;
//// }
////
//// class C implements A {[| |]}

verify.rangeAfterCodeFix(`
x: number;
protected z: number;
public w: number;
`);