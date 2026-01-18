//// [tests/cases/conformance/types/literal/stringLiteralsWithEqualityChecks02.ts] ////

//// [stringLiteralsWithEqualityChecks02.ts]
declare let x: "foo";
declare let y: "foo" | "bar";

let b: boolean;
b = x == y;
b = "foo" == y
b = y == "foo";
b = "foo" == "bar";
b = "bar" == x;
b = x == "bar";
b = y == "bar";
b = "bar" == y;

b = x != y;
b = "foo" != y
b = y != "foo";
b = "foo" != "bar";
b = "bar" != x;
b = x != "bar";
b = y != "bar";
b = "bar" != y;



//// [stringLiteralsWithEqualityChecks02.js]
var b;
b = x == y;
b = "foo" == y;
b = y == "foo";
b = "foo" == "bar";
b = "bar" == x;
b = x == "bar";
b = y == "bar";
b = "bar" == y;
b = x != y;
b = "foo" != y;
b = y != "foo";
b = "foo" != "bar";
b = "bar" != x;
b = x != "bar";
b = y != "bar";
b = "bar" != y;
