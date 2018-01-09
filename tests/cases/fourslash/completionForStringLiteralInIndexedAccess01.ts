/// <reference path='fourslash.ts'/>

////interface Foo {
////    foo: string;
////    bar: string;
////}
////
////let x: Foo["/*1*/"]

goTo.marker("1");
verify.completionListContains("foo");
verify.completionListContains("bar");
verify.completionListCount(2);
