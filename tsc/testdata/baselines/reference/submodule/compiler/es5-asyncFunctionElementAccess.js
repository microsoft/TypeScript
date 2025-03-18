//// [tests/cases/compiler/es5-asyncFunctionElementAccess.ts] ////

//// [es5-asyncFunctionElementAccess.ts]
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


//// [es5-asyncFunctionElementAccess.js]
async function elementAccess0() {
    z = await x[y];
}
async function elementAccess1() {
    z = (await x)[y];
}
async function elementAccess2() {
    z = x[await y];
}
