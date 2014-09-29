/// <reference path="fourslash.ts"/>

////function foo(a: string) { };
////var b = "test";
////foo("test"/*1*/);
////foo(b/*2*/);

goTo.marker("1");
verify.currentParameterHelpArgumentNameIs("a");
goTo.marker("2");
verify.currentParameterHelpArgumentNameIs("a");