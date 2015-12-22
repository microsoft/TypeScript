//// [stringLiteralsWithEqualityChecks02.ts]
interface Refrigerator {
    brrr: boolean;
}

let x: "foo";
let y: "foo" | "bar";

let b: boolean;
b = x === y;
b = "foo" === y
b = y === "foo";
b = "foo" === "bar";

b = x !== y;
b = "foo" !== y
b = y !== "foo";
b = "foo" !== "bar";



//// [stringLiteralsWithEqualityChecks02.js]
var x;
var y;
var b;
b = x === y;
b = "foo" === y;
b = y === "foo";
b = "foo" === "bar";
b = x !== y;
b = "foo" !== y;
b = y !== "foo";
b = "foo" !== "bar";
