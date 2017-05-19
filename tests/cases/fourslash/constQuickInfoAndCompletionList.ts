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
verify.quickInfoAt("1", "const a: 10");

goTo.marker('2');
verify.completionListContains("a", "const a: 10");
verify.quickInfoIs("const a: 10");

goTo.marker('3');
verify.completionListContains("a", "const a: 10");

verify.quickInfoAt("4", "const b: 20");

goTo.marker('5');
verify.completionListContains("a", "const a: 10");
verify.completionListContains("b", "const b: 20");
verify.quickInfoIs("const b: 20");

goTo.marker('6');
verify.completionListContains("a", "const a: 10");
verify.completionListContains("b", "const b: 20");
verify.quickInfoIs("const a: 10");

goTo.marker('7');
verify.completionListContains("a", "const a: 10");
verify.completionListContains("b", "const b: 20");
