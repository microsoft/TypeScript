/// <reference path='fourslash.ts' />
// based on acorn

////function isIdentifierStart([|code, astral |]) {
////  if (code < 65) { return code === 36 }
////  if (code < 91) { return true }
////  if (code < 97) { return code === 95 }
////  if (code < 123) { return true }
////  if (code <= 0xffff) { return code >= 0xaa }
////  if (astral === false) { return false }
////}
////
////function isLet(nextCh: any) {
////    return isIdentifierStart(nextCh, true)
////};


verify.rangeAfterCodeFix("code: number, astral: boolean",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);
