/// <reference path='fourslash.ts'/>

////type X    =     [number]/*1*/
goTo.marker("1");
edit.insert(";");
verify.currentLineContentIs("type X = [number];");