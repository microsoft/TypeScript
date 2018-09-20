// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function ifStatement1() {
    if (await x) { y; } else { z; }
}

async function ifStatement2() {
    if (x) { await y; } else { z; }
}

async function ifStatement3() {
    if (x) { y; } else { await z; }
}