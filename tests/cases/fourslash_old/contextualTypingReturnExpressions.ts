/// <reference path='fourslash.ts'/>

////interface A { }
////var f44: (x: A) => (y: A) => A = x/*1*/ => y/*2*/ => x/*3*/;

goTo.marker('1');
verify.quickInfoIs('A');

goTo.marker('2');
verify.quickInfoIs('A');

goTo.marker('3');
verify.quickInfoIs('A');