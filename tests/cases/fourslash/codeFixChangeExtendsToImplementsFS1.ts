/// <reference path='fourslash.ts' />

//// interface I1 {}
//// [|class c1 extends I1|]{}

verify.rangeAfterCodeFix("class c1 implements I1");