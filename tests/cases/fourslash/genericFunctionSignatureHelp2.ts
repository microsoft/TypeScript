/// <reference path='fourslash.ts'/>

////var f = <T>(a: T) => a;
////f(/**/

verify.signatureHelp({ marker: "", text: "f(a: {}): {}" });
