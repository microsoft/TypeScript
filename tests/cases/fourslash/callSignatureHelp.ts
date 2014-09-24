/// <reference path='fourslash.ts'/>

////interface C {
////   (): number;
////}
////var c: C;
////c(/**/

goTo.marker();
verify.currentSignatureHelpIs('c(): number');