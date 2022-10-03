//// [stringLiteralsAssertionsInEqualityComparisons02.ts]
type EnhancedString = string & { enhancements: any };

var a = "foo" === "bar" as "baz";
var b = "foo" !== ("bar" as "foo");
var c = "foo" == (<number>"bar");
var d = "foo" === ("bar" as EnhancedString);

//// [stringLiteralsAssertionsInEqualityComparisons02.js]
var a = "foo" === "bar";
var b = "foo" !== "bar";
var c = "foo" == "bar";
var d = "foo" === "bar";
