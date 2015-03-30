/// <reference path='fourslash.ts' />

////p/*1*/
////
////function fun(param) {
////    let party = Math.random() < 0.99;
////}

goTo.marker("1");
verify.not.completionListContains("param");
verify.not.completionListContains("party");