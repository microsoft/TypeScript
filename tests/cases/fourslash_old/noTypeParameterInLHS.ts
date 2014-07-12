/// <reference path='fourslash.ts'/>

////interface I<T> { }
////class C<T> {}
////var i/*1*/: I<any>;
////var c/*2*/: C<I>;

goTo.marker('1');
verify.quickInfoIs('I<any>');
goTo.marker('2');
verify.quickInfoIs('C<I<any>>');
