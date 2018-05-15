/// <reference path="fourslash.ts"/>

////function foo(a: string) { };
////var b = "test";
////foo("test"/*1*/);
////foo(b/*2*/);

verify.signatureHelp({ marker: test.markerNames(), parameterName: "a" });
