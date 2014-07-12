/// <reference path='fourslash.ts'/>

////interface Foo<T> {
////    x: Foo<string>;
////    y: Foo<number>;
////}

////var f: Foo<number>;
////var xx/*1*/ = f.x;
////var yy/*2*/ = f.y;

////var f2: Foo<string>;
////var x2/*3*/ = f2.x;
////var y2/*4*/ = f2.y;

goTo.marker('1');
verify.quickInfoIs('Foo<string>');
goTo.marker('2');
verify.quickInfoIs('Foo<number>');

goTo.marker('3');
verify.quickInfoIs('Foo<string>');
goTo.marker('4');
verify.quickInfoIs('Foo<number>');