/// <reference path='fourslash.ts' />

////const /*1*/a = 10;
////var x = /*2*/a;
/////*3*/
////function foo() {
////    const /*4*/b = 20;
////    var y = /*5*/b;
////    var z = /*6*/a;
////    /*7*/
////}
goTo.marker('1');
verify.quickInfoIs("(const) a: number");

goTo.marker('2');
verify.completionListContains("a", "(const) a: number");
verify.quickInfoIs("(const) a: number");

goTo.marker('3');
verify.completionListContains("a", "(const) a: number");

goTo.marker('4');
verify.quickInfoIs("(const) b: number");

goTo.marker('5');
verify.completionListContains("a", "(const) a: number");
verify.completionListContains("b", "(const) b: number");
verify.quickInfoIs("(const) b: number");

goTo.marker('6');
verify.completionListContains("a", "(const) a: number");
verify.completionListContains("b", "(const) b: number");
verify.quickInfoIs("(const) a: number");

goTo.marker('7');
verify.completionListContains("a", "(const) a: number");
verify.completionListContains("b", "(const) b: number");