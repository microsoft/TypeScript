/// <reference path='fourslash.ts' />

////function foo(a) { }
////foo(hello my name /**/is

verify.signatureHelp({ marker: "", text: "foo(a: any): void" });
