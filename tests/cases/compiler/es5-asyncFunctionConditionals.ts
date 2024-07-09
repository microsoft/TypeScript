// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function conditional0() {
    a = (await x) ? y : z;
}

async function conditional1() {
    a = x ? await y : z;
}

async function conditional2() {
    a = x ? y : await z;
}