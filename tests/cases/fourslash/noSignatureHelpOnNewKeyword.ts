///<reference path="fourslash.ts"/>

////class Foo { }
////new/*1*/ Foo
////new /*2*/Foo(/*3*/)

goTo.marker('1');
verify.not.signatureHelpPresent();

goTo.marker('2');
verify.not.signatureHelpPresent();

goTo.marker('3');
verify.signatureHelpPresent();