// @declaration: true

declare function f(x: (p: "foo" | "bar") => "foo"): void;

f(y => {
    const z = y = "foo";
    return z;
})