// @declaration: true

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