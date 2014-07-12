/// <reference path='fourslash.ts'/>

////function foo<T>(x: T) {
////        return x;
////}

////function other2<T extends Date>(arg: T) {
////    var b: { [x: string]: T };
////    var r2/*1*/ = foo(b); // just shows T
////}

goTo.marker('1');
verify.quickInfoIs('{ [x: string]: T; }');