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
var x;
var y;
var b;
b = x == y;
b = "foo" == y;
b = y == "foo";
b = "foo" == "bar";
b = x != y;
b = "foo" != y;
b = y != "foo";
b = "foo" != "bar";
