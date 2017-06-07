/// <reference path='fourslash.ts' />

/////*1*/interface Gourai { new   () {} }
/////*2*/type Stylet = { new   () {} }
format.document();
goTo.marker("1");
verify.currentLineContentIs("interface Gourai { new() {} }");
goTo.marker("2");
verify.currentLineContentIs("type Stylet = { new() {} }");