/// <reference path="fourslash.ts" />

////function str(n: number): string;
/////**
//// * Stringifies a number with radix
//// * @param radix The radix
//// */
////function str(n: number, radix: number): string;
////function str(n: number, radix?: number): string { return ""; }

edit.insert("str(1,");
verify.currentParameterHelpArgumentNameIs("radix");
verify.currentParameterHelpArgumentDocCommentIs("The radix");
verify.currentSignatureHelpIs("str(n: number, radix: number): string");
verify.currentSignatureHelpDocCommentIs("Stringifies a number with radix");
