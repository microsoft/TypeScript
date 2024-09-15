/// <reference path="fourslash.ts" />

// @strict: true
//// type keyword = "foo" | "bar" | "baz"
//// 
//// type validateString<s> = s extends keyword
////     ? s
////     : s extends `${infer left extends keyword}|${infer right}`
////     ? right extends keyword
////         ? s
////         : `${left}|${keyword}`
////     : keyword
////
//// type isUnknown<t> = unknown extends t
////     ? [t] extends [{}]
////         ? false
////         : true
////     : false
////
//// type validate<def> = def extends string
////     ? validateString<def>
////     : isUnknown<def> extends true
////     ? keyword
////     : {
////           [k in keyof def]: validate<def[k]>
////       }
//// const parse = <def>(def: validate<def>) => def
//// const shallowExpression = parse("foo|/*ts*/")
//// const nestedExpression = parse({ prop: "foo|/*ts2*/" })

verify.completions({ marker: ["ts"], exact: ["foo", "bar", "baz", "foo|foo", "foo|bar", "foo|baz"] });
verify.completions({ marker: ["ts2"], exact: ["foo|foo", "foo|bar", "foo|baz"] });
