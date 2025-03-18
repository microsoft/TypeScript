//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesInUnionTypes03.ts] ////

//// [stringLiteralTypesInUnionTypes03.ts]
type T = number | "foo" | "bar";

var x: "foo" | "bar" | number;
var y: T = undefined;

if (x === "foo") {
    let a = x;
}
else if (x !== "bar") {
    let b = x || y;
}
else {
    let c = x;
    let d = y;
    let e: (typeof x) | (typeof y) = c || d;
}

x = y;
y = x;

//// [stringLiteralTypesInUnionTypes03.js]
var x;
var y = undefined;
if (x === "foo") {
    let a = x;
}
else if (x !== "bar") {
    let b = x || y;
}
else {
    let c = x;
    let d = y;
    let e = c || d;
}
x = y;
y = x;
