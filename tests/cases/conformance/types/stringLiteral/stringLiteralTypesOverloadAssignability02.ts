// @declaration: true

function f(x: "foo"): number;
function f(x: "foo"): number {
    return 0;
}

function g(x: "bar"): number;
function g(x: "bar"): number {
    return 0;
}

let a = f;
let b = g;

a = b;
b = a;