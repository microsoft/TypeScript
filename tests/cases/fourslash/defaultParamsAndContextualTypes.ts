/// <reference path="fourslash.ts"/>

////interface FooOptions {
////    text?: string;
////}
////interface Foo {
////    bar(xy: string, options?: FooOptions): void;
////}
////var o: Foo = {
////    bar: function (x/*1*/y, opt/*2*/ions = {}) {
////        // expect xy to have type string, and options to have type FooOptions in here
////    }
////}

goTo.marker('1');
verify.quickInfoIs('(parameter) xy: string');
goTo.marker('2');
verify.quickInfoIs('(parameter) options: FooOptions');
