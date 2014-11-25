/// <reference path='fourslash.ts' />

////module m { export class c { } };
////function x(arg: m.c) { return arg; }
////x(/**/

goTo.marker();
verify.currentSignatureHelpIs('x(arg: m.c): m.c');
