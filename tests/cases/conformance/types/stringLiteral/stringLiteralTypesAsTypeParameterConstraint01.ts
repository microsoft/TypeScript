// @declaration: true

function foo<T extends "foo">(f: (x: T) => T) {
    return f;
}

function bar<T extends "foo" | "bar">(f: (x: T) => T) {
    return f;
}

let f = foo(x => x);
let fResult = f("foo");

let g = foo((x => x));
let gResult = g("foo");

let h = bar(x => x);
let hResult = h("foo");
hResult = h("bar");