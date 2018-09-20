/// <reference path='fourslash.ts'/>

////type Options = "Option 1" | "Option 2" | "Option 3";
////var x: Options = "/*1*/Option 3";
////
////function f(a: Options) { };
////f("/*2*/

goTo.marker('1');
verify.completionListContains("Option 1");
verify.completionListCount(3);

goTo.marker('2');
verify.completionListContains("Option 2");
verify.completionListCount(3);
