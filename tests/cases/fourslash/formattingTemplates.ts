///<reference path="fourslash.ts"/>

////String.call `${123}`/*1*/
////String.call `${123} ${456}`/*2*/

goTo.marker("1");
edit.insert(";");
verify.currentLineContentIs("String.call`${123}`;");

goTo.marker("2");
edit.insert(";");
verify.currentLineContentIs("String.call`${123} ${456}`;");