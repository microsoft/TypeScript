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


//// [stringLiteralTypesInUnionTypes03.d.ts]
declare type T = number | "foo" | "bar";
declare var x: "foo" | "bar" | number;
declare var y: T;
