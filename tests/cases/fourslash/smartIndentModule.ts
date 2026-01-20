/// <reference path='fourslash.ts'/>

////namespace Foo {
////    /*insideModule*/
////}
/////*afterModule*/

goTo.marker('insideModule');
verify.indentationIs(4);

goTo.marker('afterModule');
verify.indentationIs(0);
