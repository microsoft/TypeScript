/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// var x1 = <di/*1*/v></di/*2*/v>
//// class MyElement {}
//// var z = <My/*3*/Element></My/*4*/Element>

goTo.marker("1");
verify.quickInfoIs("any", undefined);

goTo.marker("2");
verify.quickInfoIs("any", undefined);;

goTo.marker("3");
verify.quickInfoIs("class MyElement", undefined);;

goTo.marker("4");
verify.quickInfoIs("class MyElement", undefined);;