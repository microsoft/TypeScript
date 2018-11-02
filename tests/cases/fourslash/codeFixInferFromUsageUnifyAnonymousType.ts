/// <reference path='fourslash.ts' />
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


verify.rangeAfterCodeFix("name: string, options: { startsExpr?: boolean; beforeExpr?: boolean; isLoop?: boolean; prefix?: boolean; } | undefined",/*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);
