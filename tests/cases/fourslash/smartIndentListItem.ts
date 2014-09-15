/// <reference path='fourslash.ts'/>
////[1,
////    2
////          + 3, 4,
////    /*1*/
////[1,
////    2
////          + 3, 4
////    /*2*/

goTo.marker("1");
verify.indentationIs(4)
goTo.marker("2");
verify.indentationIs(4)