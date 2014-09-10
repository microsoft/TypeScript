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

test.markers().forEach((marker) => {
    goTo.position(marker.position, marker.fileName);

    verify.completionListIsEmpty();
});
