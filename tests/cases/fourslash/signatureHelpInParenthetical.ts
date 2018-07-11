/// <reference path='fourslash.ts' />

//// class base { constructor (public n: number, public y: string) { } }
//// (new base(/**/

verify.signatureHelp({ marker: "", parameterName: "n" });
edit.insert('0, ');
verify.signatureHelp({ parameterName: "y" });
