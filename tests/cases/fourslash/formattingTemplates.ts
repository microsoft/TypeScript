///<reference path="fourslash.ts"/>

////String.call `${123}`/*1*/

goTo.marker("1");
edit.insert(";");
verify.currentLineContentIs("String.call `${123}`;");