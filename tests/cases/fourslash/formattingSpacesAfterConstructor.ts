/// <reference path="fourslash.ts" />

/////*1*/class test { constructor                   () { } }
format.document();
goTo.marker("1");
verify.currentLineContentIs("class test { constructor() { } }");

/////*2*/class test { constructor                   () { } }
format.setOption("InsertSpaceAfterConstructor", true);

format.document();
goTo.marker("2");
verify.currentLineContentIs("class test { constructor () { } }");