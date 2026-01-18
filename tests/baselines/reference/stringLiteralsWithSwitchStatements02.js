//// [tests/cases/conformance/types/literal/stringLiteralsWithSwitchStatements02.ts] ////

//// [stringLiteralsWithSwitchStatements02.ts]
declare let x: "foo";
declare let y: "foo" | "bar";

let b: boolean;
b = x == y;
b = "foo" == y
b = y == "foo";
b = "foo" == "bar";

b = x != y;
b = "foo" != y
b = y != "foo";
b = "foo" != "bar";



//// [stringLiteralsWithSwitchStatements02.js]
var b;
b = x == y;
b = "foo" == y;
b = y == "foo";
b = "foo" == "bar";
b = x != y;
b = "foo" != y;
b = y != "foo";
b = "foo" != "bar";
