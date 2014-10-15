/// <reference path='fourslash.ts'/>

////class C<T> {
////   foo(x: T) { }
////}
////var x = new /*1*/C<any>();
////var y = C.proto/*2*/type;

goTo.marker('1');
verify.quickInfoIs('(constructor) C<any>(): C<any>');

goTo.marker('2');
verify.quickInfoIs('(property) C<T>.prototype: C<any>');