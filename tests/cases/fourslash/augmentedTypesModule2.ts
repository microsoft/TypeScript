/// <reference path='fourslash.ts'/>

////function /*11*/m2f(x: number) { };
////namespace m2f { export interface I { foo(): void } }
////var x: m2f./*1*/
////var /*2*/r = m2f/*3*/;

verify.quickInfoAt("11", "function m2f(x: number): void\nnamespace m2f");

goTo.marker('1');
verify.completionListContains('I');

edit.insert('I.');
verify.not.completionListContains('foo');
edit.backspace(1);

verify.quickInfoAt("2", "var r: (x: number) => void");

goTo.marker('3');
edit.insert('(');
verify.signatureHelp({ text: "m2f(x: number): void" });
