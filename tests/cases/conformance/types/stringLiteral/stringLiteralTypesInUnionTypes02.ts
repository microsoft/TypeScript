// @declaration: true

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