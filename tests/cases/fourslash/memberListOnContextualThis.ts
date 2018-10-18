/// <reference path='fourslash.ts'/>
////interface A {
////    a: string;
////}
////declare function ctx(callback: (this: A) => string): string;
////ctx(function () { return th/*1*/is./*2*/a });

goTo.marker('1');
verify.quickInfoIs("this: A");
goTo.marker('2');
verify.completionListContains('a', '(property) A.a: string');

