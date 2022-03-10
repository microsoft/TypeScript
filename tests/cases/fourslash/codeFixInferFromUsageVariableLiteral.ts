/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// let [|text! |];
//// text.length;
//// text.indexOf("z");
//// text.charAt(0);

verify.rangeAfterCodeFix("text!: string", /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, /*index*/0);
