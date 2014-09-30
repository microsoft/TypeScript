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
////var /*1*/b: B<number>;
////var /*2*/b2: B<number>;

goTo.marker('1');
verify.quickInfoIs('(var) b: B<number>');

goTo.marker('2');
verify.quickInfoIs('(var) b2: B<number>');