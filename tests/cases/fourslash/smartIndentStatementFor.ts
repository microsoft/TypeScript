/// <reference path='fourslash.ts'/>

////function Foo() {
////    for (var i = 0; i < 10; i++) {
////        /*insideStatement*/
////    }
////    /*afterStatement*/
////}

goTo.marker('insideStatement');
verify.indentationIs(8);

goTo.marker('afterStatement');
verify.indentationIs(4);
