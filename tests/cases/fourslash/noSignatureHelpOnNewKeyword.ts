///<reference path="fourslash.ts"/>

////class Foo { }
////new/*1*/ Foo
////new /*2*/Foo(/*3*/)

verify.noSignatureHelp("1", "2");
verify.signatureHelp({ marker: "3", text: "Foo(): Foo" });
