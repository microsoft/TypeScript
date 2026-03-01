//// [tests/cases/conformance/types/literal/stringLiteralsAssertionsInEqualityComparisons01.ts] ////

//// [stringLiteralsAssertionsInEqualityComparisons01.ts]
var a = "foo" === "bar" as string;
var b = "foo" !== ("bar" as string);
var c = "foo" == (<any>"bar");

//// [stringLiteralsAssertionsInEqualityComparisons01.js]
"use strict";
var a = "foo" === "bar";
var b = "foo" !== "bar";
var c = "foo" == "bar";
