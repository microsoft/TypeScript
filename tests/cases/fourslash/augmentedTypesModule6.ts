/// <reference path='fourslash.ts'/>

////declare class m3f { foo(x: number): void }
////module m3f { export interface I { foo(): void } }
////var x: m3f./*1*/
////var /*4*/r = new /*2*/m3f(/*3*/);
////r./*5*/
////var r2: m3f.I = r;
////r2./*6*/

verify.completions({ at: "1", includes: "I", excludes: "foo" });
edit.insert('I;');

verify.completions({ at: "2", includes: "m3f" });

goTo.marker('3');
verify.currentSignatureHelpIs('m3f(): m3f');

verify.quickInfoAt("4", "var r: m3f");

verify.completions({ at: "5", includes: "foo" });
edit.insert('foo(1)');

verify.completions({ at: "6", includes: "foo" });
edit.insert('foo(');
verify.currentSignatureHelpIs('foo(): void');
