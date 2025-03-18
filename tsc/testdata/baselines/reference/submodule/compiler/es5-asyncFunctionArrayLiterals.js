//// [tests/cases/compiler/es5-asyncFunctionArrayLiterals.ts] ////

//// [es5-asyncFunctionArrayLiterals.ts]
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

//// [es5-asyncFunctionArrayLiterals.js]
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
