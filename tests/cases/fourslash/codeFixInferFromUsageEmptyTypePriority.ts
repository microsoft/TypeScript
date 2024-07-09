/// <reference path='fourslash.ts' />
// @strict: true
// based on acorn, translated to TS

////function TokenType([|label, conf |]) {
////  if ( conf === void 0 ) conf = {};
////
////  var l = label;
////  var keyword = conf.keyword;
////  var beforeExpr = !!conf.beforeExpr;
////};

verify.rangeAfterCodeFix("label: any, conf: { keyword?: any; beforeExpr?: any; } | undefined",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);
