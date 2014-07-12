/// <reference path='fourslash.ts'/>

////function foo() {
////    var y/*ref1*/1: string;
////    var x: typeof y/*ref2*/1;
////}

goTo.marker('ref2');
verify.quickInfoIs("string", undefined, "y1", "local var");

goTo.marker('ref1');
verify.quickInfoIs("string", undefined, "y1", "local var");

goTo.marker('ref2');
verify.quickInfoIs("string", undefined, "y1", "local var");
