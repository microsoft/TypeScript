/// <reference path='fourslash.ts' />

////p/*1*/
////
////function fun(param) {
////    let party = Math.random() < 0.99;
////}

verify.completions({ marker: "1", excludes: ["param", "party"] });
