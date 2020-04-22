/// <reference path='fourslash.ts' />

// @target: es2015
// @Filename: /a.ts
////[|async function x(): boolean { return true; }|]

verify.rangeAfterCodeFix(`async function x(): Promise<boolean> { return true; }`, /*includeWhiteSpace*/false, /*errorCode*/ void 0, /*index*/ 0);
