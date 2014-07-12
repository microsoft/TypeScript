/// <reference path='fourslash.ts'/>

////class C<T> {
////   foo(x: T) { }
////}
////var x = new C/*1*/<any>();
////var y = C.proto/*2*/type;

goTo.marker('1');
verify.quickInfoIs('(): C<any>');

goTo.marker('2');
verify.quickInfoIs('C<any>');