//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesInUnionTypes02.ts] ////

//// [stringLiteralTypesInUnionTypes02.ts]
type T = string | "foo" | "bar" | "baz";

var x: "foo" | "bar" | "baz" | string = undefined;
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

//// [stringLiteralTypesInUnionTypes02.js]
var x = undefined;
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
