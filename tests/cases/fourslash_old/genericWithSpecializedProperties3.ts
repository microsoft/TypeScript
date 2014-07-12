/// <reference path='fourslash.ts'/>

////interface Foo<T, U> {
////    x: Foo<T, U>;
////    y: Foo<U, U>;
////}

////var f: Foo<number, string>;
////var xx/*1*/ = f.x;
////var yy/*2*/ = f.y;

////var f2: Foo<string, number>;
////var x2/*3*/ = f2.x;
////var y2/*4*/ = f2.y;

goTo.marker('1');
verify.quickInfoIs('Foo<number, string>');
goTo.marker('2');
verify.quickInfoIs('Foo<string, string>');

goTo.marker('3');
verify.quickInfoIs('Foo<string, number>');
goTo.marker('4');
verify.quickInfoIs('Foo<number, number>');