/// <reference path='fourslash.ts'/>

////declare var module/*1*/

goTo.marker("1");
edit.insert(";");
verify.currentLineContentIs("declare var module;");