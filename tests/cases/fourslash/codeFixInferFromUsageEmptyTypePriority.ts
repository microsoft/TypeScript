/// <reference path='fourslash.ts' />

// @stableTypeOrdering: true
// @strict: true
// based on acorn, translated to TS

////function TokenType([|label, conf |]) {
////  if ( conf === void 0 ) conf = {};
////
////  var l = label;
////  var keyword = conf.keyword;
////  var beforeExpr = !!conf.beforeExpr;
////};

verify.rangeAfterCodeFix("label: any, conf: { beforeExpr?: any; keyword?: any; } | undefined",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);
