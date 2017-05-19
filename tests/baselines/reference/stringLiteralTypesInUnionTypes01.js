//// [stringLiteralTypesInUnionTypes01.ts]
type T = "foo" | "bar" | "baz";

var x: "foo" | "bar" | "baz" = undefined;
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

//// [stringLiteralTypesInUnionTypes01.js]
var x = undefined;
var y = undefined;
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


//// [stringLiteralTypesInUnionTypes01.d.ts]
declare type T = "foo" | "bar" | "baz";
declare var x: "foo" | "bar" | "baz";
declare var y: T;
