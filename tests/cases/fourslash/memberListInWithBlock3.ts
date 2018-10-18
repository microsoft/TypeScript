/// <reference path='fourslash.ts'/>

////var x = { a: 0 };
////with(x./*1*/

goTo.marker('1');
verify.completionListContains("a");
