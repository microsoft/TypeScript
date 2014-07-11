//// [declFileTypeofFunction.ts]

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

//// [declFileTypeofFunction.js]
function f() {
    return undefined;
}
function g() {
    return undefined;
}
var b;
function b1() {
    return b1;
}
function foo() {
    return null;
}
var foo1;
var foo2 = foo;
var foo3 = function () {
    return foo3;
};
var x = function () {
    return x;
};
function foo5(x) {
    function bar(x) {
        return x;
    }
    return bar;
}


//// [declFileTypeofFunction.d.ts]
declare function f(n);
declare function f(n);
declare function f();
declare function g(n);
declare function g(n);
declare function g();
declare var b;
declare function b1();
declare function foo();
declare var foo1;
declare var foo2;
declare var foo3;
declare var x;
declare function foo5(x);
