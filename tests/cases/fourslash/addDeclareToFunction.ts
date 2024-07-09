/// <reference path="fourslash.ts" />

//// /*1*/function parseInt(s/*2*/:string):number;

goTo.marker('2');
edit.deleteAtCaret(':string'.length);
goTo.marker('1');
edit.insert('declare ');