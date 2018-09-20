/// <reference path='fourslash.ts'/>

////interface Foo {
////    foo: string;
////    bar: string;
////}
////
////function f<K extends keyof Foo>(a: K) { };
////f("/*1*/

goTo.marker('1');
verify.completionListContains("foo");
verify.completionListContains("bar");
verify.completionListCount(2);

