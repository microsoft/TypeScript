// @declaration: true

declare function f(x: (p: "foo" | "bar") => "foo");

f(y => {
    let z = y = "foo";
    return z;
})