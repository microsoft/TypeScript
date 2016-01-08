//// [stringLiteralsAssertionsInEqualityComparisons02.ts]
var a = "foo" === "bar" as "baz";
var b = "foo" !== ("bar" as "foo");
var c = "foo" == (<number>"bar");

//// [stringLiteralsAssertionsInEqualityComparisons02.js]
var a = "foo" === "bar";
var b = "foo" !== "bar";
var c = "foo" == "bar";
