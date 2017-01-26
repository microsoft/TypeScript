/// <reference path='fourslash.ts'/>

////declare class A {
////    foo;
////}
////declare class B extends A {
////    bar;
////}
////declare class C extends B {
////    baz;
////}
////
////var c = new C();
////c./*1*/
////var b = new B();
////b./*2*/
////var a = new A();
////a./*3*/

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