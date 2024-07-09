// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a;

async function arrayLiteral0() {
    x = [await y, z];
}

async function arrayLiteral1() {
    x = [y, await z];
}

async function arrayLiteral2() {
    x = [...(await y), z];
}

async function arrayLiteral3() {
    x = [...y, await z];
}

async function arrayLiteral4() {
    x = [await y, ...z];
}

async function arrayLiteral5() {
    x = [y, ...(await z)];
}

async function arrayLiteral6() {
    x = [y, await z, a];
}

async function arrayLiteral7() {
    x = [await y, z, await a];
}