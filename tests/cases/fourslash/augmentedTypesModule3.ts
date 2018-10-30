/// <reference path='fourslash.ts'/>

////function m2g() { };
////module m2g { export class C { foo(x: number) { } } }
////var x: m2g./*1*/;
////var /*2*/r = m2g/*3*/;

verify.completions({ marker: "1", exact: "C" });

edit.insert('C.');
verify.completions({ exact: undefined });
edit.backspace(1);

verify.quickInfoAt("2", "var r: typeof m2g");

goTo.marker('3');
edit.insert('(');
verify.signatureHelp({ text: "m2g(): void" });
