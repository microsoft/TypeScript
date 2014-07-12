/// <reference path='fourslash.ts'/>

////class A<T> {
////    foo() { }
////}
////class B<T> extends A<T> {
////    bar() { }
////    constructor() { super() }
////}
////class B2<T> extends A<T> {
////    bar() { }
////}

////var b/*1*/: B<number>;
////var b2/*2*/: B<number>;

goTo.marker('1');
verify.quickInfoIs('B<number>');

goTo.marker('2');
verify.quickInfoIs('B<number>');