//// [tests/cases/conformance/types/literal/stringLiteralsWithSwitchStatements02.ts] ////

//// [stringLiteralsWithSwitchStatements02.ts]
let x: "foo";
let y: "foo" | "bar";

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
let x;
let y;
let b;
b = x == y;
b = "foo" == y;
b = y == "foo";
b = "foo" == "bar";
b = x != y;
b = "foo" != y;
b = y != "foo";
b = "foo" != "bar";
