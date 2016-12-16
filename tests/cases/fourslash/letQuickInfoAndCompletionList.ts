/// <reference path='fourslash.ts' />

////let /*1*/a = 10;
/////*2*/a = 30;
////function foo() {
////    let /*3*/b = 20;
////    /*4*/b = /*5*/a;
////}

verify.quickInfoAt("1", "let a: number");

goTo.marker('2');
verify.completionListContains("a", "let a: number");
verify.quickInfoIs("let a: number");

verify.quickInfoAt("3", "let b: number");

goTo.marker('4');
verify.completionListContains("a", "let a: number");
verify.completionListContains("b", "let b: number");
verify.quickInfoIs("let b: number");

goTo.marker('5');
verify.completionListContains("a", "let a: number");
verify.completionListContains("b", "let b: number");
verify.quickInfoIs("let a: number");
