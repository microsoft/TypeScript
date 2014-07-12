/// <reference path='fourslash.ts'/>

////class C<T> {
////   foo(x: T) { }
////}
////var x/*1*/ = new C<any>(); // Quick Info for x is C<any>
////var y/*2*/ = C.prototype; // Quick Info for y is C<{}>

goTo.marker('1');
verify.quickInfoIs('C<any>');

goTo.marker('2');
verify.quickInfoIs('C<any>');
