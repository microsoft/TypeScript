/// <reference path='fourslash.ts' />

//// class base { constructor (public n: number, public y: string) { } }
//// (new base(/**/

goTo.marker();
verify.currentParameterHelpArgumentNameIs('n');
edit.insert('0, ');
verify.currentParameterHelpArgumentNameIs('y');
