// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function elementAccess0() {
    z = await x[y];
}

async function elementAccess1() {
    z = (await x)[y];
}

async function elementAccess2() {
    z = x[await y];
}
