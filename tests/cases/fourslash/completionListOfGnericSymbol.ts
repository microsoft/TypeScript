/// <reference path="fourslash.ts" />

// Ensure kind is set correctelly on completions of a generic symbol

////var a = [1,2,3];
////a./**/

goTo.marker();
verify.completionListContains('length', "(property) Array<number>.length: number", /*docComments*/ undefined, /*kind*/ "property");
verify.completionListContains('toString', "(method) Array<number>.toString(): string", /*docComments*/ undefined, /*kind*/ "method");

