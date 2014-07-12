/// <reference path='fourslash.ts'/>

////class A {}
////A.prototype/*1*/;
////A./*2*/

goTo.marker('1');
verify.quickInfoIs('A');

goTo.marker('2');
verify.completionListContains('prototype', 'A');
