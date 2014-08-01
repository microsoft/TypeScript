/// <reference path='fourslash.ts'/>

////function Foo() {
////    for (var i in [])
////    {
////        /*insideStatement*/
////    }
////    /*afterStatement*/
////}

goTo.marker('insideStatement');
verify.indentationIs(8);

goTo.marker('afterStatement');
verify.indentationIs(4);
