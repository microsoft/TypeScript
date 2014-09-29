/// <reference path="fourslash.ts" />

// Ensure kind is set correctelly on completions of a generic symbol

////var a = [1,2,3];
////a./**/

goTo.marker();
// TODO. show as Array<number> or Array<T>.length instead
verify.memberListContains('length', "(property) Array.length: number", /*docComments*/ undefined, /*kind*/ "property");
verify.memberListContains('toString', "(method) Array.toString(): string", /*docComments*/ undefined, /*kind*/ "method");

