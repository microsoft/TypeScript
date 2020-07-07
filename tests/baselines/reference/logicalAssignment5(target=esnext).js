//// [logicalAssignment5.ts]
function foo1 (f?: (a: number) => void) {
    f ??= (a => a)
    f(42)
}

function foo2 (f?: (a: number) => void) {
    f ||= (a => a)
    f(42)
}

function foo3 (f?: (a: number) => void) {
    f &&= (a => a)
    f(42)
}

function bar1 (f?: (a: number) => void) {
    f ??= (f.toString(), (a => a))
    f(42)
}

function bar2 (f?: (a: number) => void) {
    f ||= (f.toString(), (a => a))
    f(42)
}

function bar3 (f?: (a: number) => void) {
    f &&= (f.toString(), (a => a))
    f(42)
}


//// [logicalAssignment5.js]
"use strict";
function foo1(f) {
    f ??= (a => a);
    f(42);
}
function foo2(f) {
    f ||= (a => a);
    f(42);
}
function foo3(f) {
    f &&= (a => a);
    f(42);
}
function bar1(f) {
    f ??= (f.toString(), (a => a));
    f(42);
}
function bar2(f) {
    f ||= (f.toString(), (a => a));
    f(42);
}
function bar3(f) {
    f &&= (f.toString(), (a => a));
    f(42);
}
