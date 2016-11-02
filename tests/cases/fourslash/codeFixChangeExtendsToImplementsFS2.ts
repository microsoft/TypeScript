/// <reference path='fourslash.ts' />

////interface I1 {}
////[|class c1<T extends string , U> extends I1|]{}

verify.rangeAfterCodeFix("class c1<T extends string , U> implements I1");