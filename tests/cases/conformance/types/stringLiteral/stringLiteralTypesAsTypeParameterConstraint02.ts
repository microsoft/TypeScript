// @declaration: true

function foo<T extends "foo">(f: (x: T) => T) {
    return f;
}

let f = foo((y: "foo" | "bar") => y === "foo" ? y : "foo");
let fResult = f("foo");