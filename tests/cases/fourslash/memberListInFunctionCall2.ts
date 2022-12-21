/// <reference path='fourslash.ts' />

////type T = {
////    a: 1;
////    b: 2;
////}
////function F(x: T) {
////}
////F({/*1*/} as const)
  
verify.completions({
    marker: "1",
    exact: [
        { name: "a", text: "(property) a: 1" },
        { name: "b", text: "(property) b: 2" },
    ],
});
