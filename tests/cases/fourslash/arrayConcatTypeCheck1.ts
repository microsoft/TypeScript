/// <reference path="fourslash.ts" />

//// a.concat(/*2*/"hello"/*1*/, 'world');
//// 
//// a.concat(/*3*/'Hello');
//// 
//// var b = new Array/*4*/<>();
//// b.concat('hello');
//// 

edit.disableFormatting();

goTo.marker('1');

edit.deleteAtCaret(9);

goTo.marker('3');

edit.deleteAtCaret(7);

goTo.marker('2');

edit.deleteAtCaret(7);

goTo.marker('4');

