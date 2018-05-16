/// <reference path='fourslash.ts' />

////module m { export class c { } };
////function x(arg: m.c) { return arg; }
////x(/**/

verify.signatureHelp({ marker: "", text: "x(arg: m.c): m.c" });
