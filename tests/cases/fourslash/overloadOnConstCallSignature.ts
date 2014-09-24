/// <reference path='fourslash.ts'/>

////var foo: {
////    (name: string): string;
////    (name: 'order'): string;
////    (name: 'content'): string;
////    (name: 'done'): string;
////}

////var x/*2*/ = foo(/*1*/

goTo.marker('1');
verify.signatureHelpCountIs(4);
verify.currentSignatureHelpIs('foo(name: string): string');
edit.insert('"hi"');

//goTo.marker('2');
//verify.quickInfoIs('string');