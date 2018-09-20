/// <reference path='fourslash.ts'/>

////function f<T>(a: T): T { return null; }
////f(/**/

verify.signatureHelp({ marker: "", text: "f(a: {}): {}" });
