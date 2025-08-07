//// [tests/cases/compiler/declFileTypeofFunction.ts] ////

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
function f() { return undefined; }
function g() { return undefined; }
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
declare function f(n: typeof f): string;
declare function f(n: typeof g): string;
declare function g(n: typeof g): number;
declare function g(n: typeof f): number;
declare var b: () => typeof b;
declare function b1(): typeof b1;
declare function foo(): typeof foo;
declare var foo1: typeof foo;
declare var foo2: typeof foo;
declare var foo3: () => () => /*elided*/ any;
declare var x: () => () => /*elided*/ any;
declare function foo5(x: number): (x: number) => number;
