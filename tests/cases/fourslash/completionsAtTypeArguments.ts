/// <reference path="fourslash.ts" />

////interface I {
////    a: string;
////    b: number;
////}

////type T1 = Pick<I, "/*1*/">;
////interface T2 extends Pick<I, "/*2*/"> {}

verify.completions({ marker: ["1", "2"], exact: ["a", "b"] });
