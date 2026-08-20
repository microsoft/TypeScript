// @strict: false
// @target: es2015
// @declaration: true

declare function f(x: (p: "foo" | "bar") => "foo");

f(y => {
    const z = y = "foo";
    return z;
})