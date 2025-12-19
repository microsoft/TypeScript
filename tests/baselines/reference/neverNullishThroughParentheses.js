//// [tests/cases/compiler/neverNullishThroughParentheses.ts] ////

//// [neverNullishThroughParentheses.ts]
// Repro for issue where "never nullish" checks miss "never nullish" through parentheses

const x: { y: string | undefined } | undefined = undefined as any;

// Both should error - both expressions are guaranteed to be "oops"
const foo = x?.y ?? `oops` ?? "";
const bar = (x?.y ?? `oops`) ?? "";

// Additional test cases with various levels of nesting
const baz = ((x?.y ?? `oops`)) ?? "";
const qux = (((x?.y ?? `oops`))) ?? "";

// Test with different types
const str1 = ("literal") ?? "fallback";
const str2 = (("nested")) ?? "fallback";
const nested = ("a" ?? "b") ?? "c";


//// [neverNullishThroughParentheses.js]
"use strict";
// Repro for issue where "never nullish" checks miss "never nullish" through parentheses
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
var x = undefined;
// Both should error - both expressions are guaranteed to be "oops"
var foo = (_b = (_a = x === null || x === void 0 ? void 0 : x.y) !== null && _a !== void 0 ? _a : "oops") !== null && _b !== void 0 ? _b : "";
var bar = (_d = ((_c = x === null || x === void 0 ? void 0 : x.y) !== null && _c !== void 0 ? _c : "oops")) !== null && _d !== void 0 ? _d : "";
// Additional test cases with various levels of nesting
var baz = (_f = (((_e = x === null || x === void 0 ? void 0 : x.y) !== null && _e !== void 0 ? _e : "oops"))) !== null && _f !== void 0 ? _f : "";
var qux = (_h = ((((_g = x === null || x === void 0 ? void 0 : x.y) !== null && _g !== void 0 ? _g : "oops")))) !== null && _h !== void 0 ? _h : "";
// Test with different types
var str1 = (_j = ("literal")) !== null && _j !== void 0 ? _j : "fallback";
var str2 = (_k = (("nested"))) !== null && _k !== void 0 ? _k : "fallback";
var nested = (_l = ("a" !== null && "a" !== void 0 ? "a" : "b")) !== null && _l !== void 0 ? _l : "c";
