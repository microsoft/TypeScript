/// <reference path='fourslash.ts' />

////var x = "/*1*/string";
////function f(a = "/*2*/initial value") { }


goTo.marker("1");
verify.renameInfoFailed();

goTo.marker("2");
verify.renameInfoFailed();
