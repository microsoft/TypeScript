/// <reference path='fourslash.ts'/>

////declare class A {
////    static foo;
////}
////declare class B extends A {
////    static bar;
////}
////declare class C extends B {
////    static baz;
////}
////
////C./*1*/
////B./*2*/
////A./*3*/

goTo.marker('1');
verify.completionListContains('foo');
verify.completionListContains('bar');
verify.completionListContains('baz');
edit.insert('foo;');

goTo.marker('2');
verify.completionListContains('foo');
verify.completionListContains('bar');
verify.not.completionListContains('baz');
edit.insert('foo;');

goTo.marker('3');
verify.completionListContains('foo');
verify.not.completionListContains('bar');
verify.not.completionListContains('baz');
edit.insert('foo;');

verify.noErrors();