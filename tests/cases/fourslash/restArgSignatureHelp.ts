/// <reference path='fourslash.ts' />

////function f(...x: any[]) { }
////f(/**/);

verify.signatureHelp({ marker: "", parameterName: "x", isVariadic: true });
