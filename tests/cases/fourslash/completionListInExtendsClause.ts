/// <reference path='fourslash.ts' />

////interface IFoo {
////    method();
////}
////
////class Foo {
////    property: number;
////    method() { }
////    static staticMethod() { }
////}

////class test1 extends Foo./*1*/ {}

////class test2 implements IFoo./*2*/ {}

////interface test3 extends IFoo./*3*/ {}

////interface test4 implements Foo./*4*/ {}
goTo.marker("1");
verify.not.completionListIsEmpty();

goTo.marker("2");
verify.completionListIsEmpty();

goTo.marker("3");
verify.completionListIsEmpty();

goTo.marker("4");
verify.not.completionListIsEmpty();