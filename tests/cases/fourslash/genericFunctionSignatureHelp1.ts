/// <reference path='fourslash.ts'/>

////function f<T>(a: T): T { return null; }
////f(/**/

goTo.marker();
verify.currentSignatureHelpIs('f(a: {}): {}');
