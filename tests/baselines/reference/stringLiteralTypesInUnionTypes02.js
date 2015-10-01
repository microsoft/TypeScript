//// [stringLiteralTypesInUnionTypes02.ts]

type T = string | "foo" | "bar" | "baz";

var x: "foo" | "bar" | "baz" | string = "foo";
var y: T = "bar";

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
"foo" | "bar" | "baz";
var x = "foo" | "bar" | "baz" | string;
"foo";
var y = "bar";
if (x === "foo") {
    var a = x;
}
else if (x !== "bar") {
    var b = x || y;
}
else {
    var c = x;
    var d = y;
    var e = c || d;
}
x = y;
y = x;
