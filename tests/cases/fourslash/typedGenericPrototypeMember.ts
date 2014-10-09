/// <reference path='fourslash.ts'/>

////class C<T> {
////   foo(x: T) { }
////}
////var /*1*/x = new C<any>(); // Quick Info for x is C<any>
////var /*2*/y = C.prototype; // Quick Info for y is C<{}>

goTo.marker('1');
verify.quickInfoIs('(var) x: C<any>');

goTo.marker('2');
verify.quickInfoIs('(var) y: C<any>');
