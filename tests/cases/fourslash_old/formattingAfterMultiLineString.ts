/// <reference path='fourslash.ts' />

////class foo {
////    stop() {
////        var s = "hello\/*1*/
////"/*2*/
////    }
////}

goTo.marker("2");
edit.insertLine('');

goTo.marker("1");
verify.currentLineContentIs('        var s = "hello\\');