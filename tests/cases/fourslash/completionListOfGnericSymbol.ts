/// <reference path="fourslash.ts" />

// Ensure kind is set correctelly on completions of a generic symbol

////var a = [1,2,3];
////a./**/

goTo.marker();
verify.memberListContains('length', "(property) Array<T>.length: number", /*docComments*/ undefined, /*kind*/ "property");
verify.memberListContains('toString', "(method) Array<T>.toString(): string", /*docComments*/ undefined, /*kind*/ "method");

