/// <reference path="fourslash.ts" />

/////*1*/class test { constructor                   () { } }
format.document();
goTo.marker("1");
verify.currentLineContentIs("class test { constructor() { } }");