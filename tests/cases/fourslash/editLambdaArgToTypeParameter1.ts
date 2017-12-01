/// <reference path='fourslash.ts'/>

////class C<T> {
////    foo(x: T) {
////        return (a: number/*1*/) => x;
////    }
////}
/////*2*/

goTo.marker('1');
edit.backspace(6);
edit.insert('T');
verify.noErrors();

goTo.marker('2');
edit.insertLine('');
verify.noErrors();