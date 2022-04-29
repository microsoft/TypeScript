/// <reference path='fourslash.ts'/>

////interface C {
////   (): number;
////}
////var c: C;
////c(/**/

verify.signatureHelp({ marker: "", text: "c(): number" });
