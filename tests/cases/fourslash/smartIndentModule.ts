/// <reference path='fourslash.ts'/>

////module Foo {
////    /*insideModule*/
////}
/////*afterModule*/

goTo.marker('insideModule');
verify.indentationIs(4);

goTo.marker('afterModule');
verify.indentationIs(0);
