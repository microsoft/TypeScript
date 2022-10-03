/// <reference path="fourslash.ts" />

//// var a = [];
//// a.concat("hello"/*1*/);
//// 
//// a.concat('Hello');
//// 
//// var b = new Array();
//// b.concat('hello');
//// 

edit.disableFormatting();

goTo.marker('1');

edit.insert(", 'world'");
