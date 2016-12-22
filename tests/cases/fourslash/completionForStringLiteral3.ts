/// <reference path='fourslash.ts'/>

////declare function f(a: "A", b: number): void;
////declare function f(a: "B", b: number): void;
////declare function f(a: "C", b: number): void;
////declare function f(a: string, b: number): void;
////
////f("/*1*/C", 2);
////
////f("/*2*/

goTo.marker('1');
verify.completionListContains("A");
verify.completionListAllowsNewIdentifier();
verify.completionListCount(3);

goTo.marker('2');
verify.completionListContains("A");
verify.completionListAllowsNewIdentifier();
verify.completionListCount(3);
