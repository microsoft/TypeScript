/// <reference path='fourslash.ts'/>

////function m2g() { };
////module m2g { export class C { foo(x: number) { } } }
////var x: m2g./*1*/;
////var /*2*/r = m2g/*3*/;

goTo.marker('1');
verify.completionListContains('C');

edit.insert('C.');
verify.not.completionListContains('foo');
edit.backspace(1);

verify.quickInfoAt("2", "var r: typeof m2g");

goTo.marker('3');
edit.insert('(');
verify.signatureHelp({ text: "m2g(): void" });
