/// <reference path='fourslash.ts'/>

////function foo() {
////    var y/*ref1*/1: string;
////    var x: typeof y/*ref2*/1;
////}

verify.quickInfos({
    ref1: "(local var) y1: string",
    ref2: "(local var) y1: string"
});
