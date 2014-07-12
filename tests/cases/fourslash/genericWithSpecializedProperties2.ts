/// <reference path='fourslash.ts'/>

////interface Foo<T> {
////    y: Foo<number>;
////    x: Foo<string>;
////}
////var f: Foo<string>;
////var x/*1*/ = f.x; 
////var y/*2*/ = f.y; 

////var f2: Foo<number>;
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