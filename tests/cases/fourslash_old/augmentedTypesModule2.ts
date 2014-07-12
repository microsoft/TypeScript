/// <reference path='fourslash.ts'/>

////function /*11*/m2f(x: number) { };
////module m2f { export interface I { foo(): void } } 
////var x: m2f./*1*/
////var r/*2*/ = m2f/*3*/;

goTo.marker('11');
verify.quickInfoIs('(x: number): void');

goTo.marker('1');
verify.completionListContains('I');

edit.insert('I.');
verify.not.completionListContains('foo');
edit.backspace(1);

goTo.marker('2');
verify.quickInfoIs('typeof m2f');

goTo.marker('3');
edit.insert('(');
verify.currentSignatureHelpIs('m2f(x: number): void');
