// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function forStatement0() {
    for (x; y; z) { a; }
}

async function forStatement1() {
    for (await x; y; z) { a; }
}

async function forStatement2() {
    for (x; await y; z) { a; }
}

async function forStatement3() {
    for (x; y; await z) { a; }
}

async function forStatement4() {
    for (x; y; z) { await a; }
}

async function forStatement5() {
    for (var b; y; z) { a; }
}

async function forStatement6() {
    for (var c = x; y; z) { a; }
}