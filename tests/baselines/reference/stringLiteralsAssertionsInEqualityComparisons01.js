//// [stringLiteralsAssertionsInEqualityComparisons01.ts]
var a = "foo" === "bar" as string;
var b = "foo" !== ("bar" as string);
var c = "foo" == (<any>"bar");

//// [stringLiteralsAssertionsInEqualityComparisons01.js]
var a = "foo" === "bar";
var b = "foo" !== "bar";
var c = "foo" == "bar";
