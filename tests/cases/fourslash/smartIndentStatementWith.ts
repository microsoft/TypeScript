/// <reference path='fourslash.ts'/>

////function Foo() {
////    var obj = { a: 'foo' };
////    with (obj) {
////        /*insideStatement*/
////    }
////    /*afterStatement*/
////}

goTo.marker('insideStatement');
verify.indentationIs(8);

goTo.marker('afterStatement');
verify.indentationIs(4);
