// @declaration: true

function f(n: typeof f): string;
function f(n: typeof g): string;
function f() { return undefined; }
function g(n: typeof g): number;
function g(n: typeof f): number;
function g() { return undefined; }

var b: () => typeof b;

function b1() {
    return b1;
}

function foo(): typeof foo {
    return null;
}
var foo1: typeof foo;
var foo2 = foo;

var foo3 = function () {
    return foo3;
}
var x = () => {
    return x;
}

function foo5(x: number) {
    function bar(x: number) {
        return x;
    }
    return bar;
}