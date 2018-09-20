/// <reference path='fourslash.ts'/>

////class A {}
////A./*1*/prototype;
////A./*2*/

verify.quickInfoAt("1", "(property) A.prototype: A");

goTo.marker('2');
verify.completionListContains('prototype', '(property) A.prototype: A');
