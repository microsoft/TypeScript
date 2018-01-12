/// <reference path='fourslash.ts'/>

////var f = <T>(a: T) => a;
////f(/**/

goTo.marker();
verify.currentSignatureHelpIs('f(a: {}): {}');
