// @declaration: true

function f(x: "foo"): number;
function f(x: "foo"): number {
    return 0;
}

function g(x: "foo"): number;
function g(x: "foo"): number {
    return 0;
}

let a = f;
let b = g;

a = b;
b = a;