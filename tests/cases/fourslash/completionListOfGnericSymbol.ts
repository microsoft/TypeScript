/// <reference path="fourslash.ts" />

// Ensure kind is set correctelly on completions of a generic symbol

////var a = [1,2,3];
////a./**/

goTo.marker();
verify.memberListContains('length', "number", /*docComments*/ undefined, /*fullSymbolName*/ undefined,/*kind*/ "property");
verify.memberListContains('toString', "() => string", /*docComments*/ undefined, /*fullSymbolName*/ undefined,/*kind*/ "method");

