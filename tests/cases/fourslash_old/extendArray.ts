/// <reference path='fourslash.ts'/>

////interface Foo<T> extends Array<T> { }
////var x: Foo<string>;
////var r/*1*/ = x[0];

////interface Foo2 extends Array<string> { }
////var x2: Foo2;
////var r2/*2*/ = x2[0];

goTo.marker('1');
verify.quickInfoIs('string');

goTo.marker('2');
verify.quickInfoIs('string');