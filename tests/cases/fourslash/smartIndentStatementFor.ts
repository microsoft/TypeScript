/// <reference path='fourslash.ts'/>

////function Foo() {
////    for (var i = 0; i < 10; i++) {
////        /*insideStatement*/
////    }
////    /*afterStatement*/
////    for (var i = 0;;) 
////        /*insideStatement2*/
////}

goTo.marker('insideStatement');
verify.indentationIs(8);

goTo.marker('afterStatement');
verify.indentationIs(4);

goTo.marker('insideStatement2');
verify.indentationIs(8);
