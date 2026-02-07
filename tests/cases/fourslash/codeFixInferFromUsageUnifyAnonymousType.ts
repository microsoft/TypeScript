/// <reference path='fourslash.ts' />

// @stableTypeOrdering: true
// @strict: true
// based on acorn, translated to TS

////function kw([|name, options |]) {
////  if ( options === void 0 ) options = {};
////
////  options.keyword = name;
////  return keywords$1[name] = new TokenType(name, options)
////}
////kw("1")
////kw("2", { startsExpr: true })
////kw("3", { beforeExpr: false })
////kw("4", { isLoop: false })
////kw("5", { beforeExpr: true, startsExpr: true })
////kw("6", { beforeExpr: true, prefix: true, startsExpr: true })


verify.rangeAfterCodeFix("name: string, options: { beforeExpr?: boolean; isLoop?: boolean; keyword?: any; prefix?: boolean; startsExpr?: boolean; } | undefined",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);
