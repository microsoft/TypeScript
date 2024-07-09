/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function foo([|text |]) {
////     text.length;
////     text.indexOf("z");
////     text.charAt(0);
//// }

verify.rangeAfterCodeFix("text: string", /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, /*index*/0);
