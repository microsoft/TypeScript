//// [tests/cases/compiler/es5-asyncFunctionIfStatements.ts] ////

//// [es5-asyncFunctionIfStatements.ts]
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

//// [es5-asyncFunctionIfStatements.js]
async function ifStatement1() {
    if (await x) {
        y;
    }
    else {
        z;
    }
}
async function ifStatement2() {
    if (x) {
        await y;
    }
    else {
        z;
    }
}
async function ifStatement3() {
    if (x) {
        y;
    }
    else {
        await z;
    }
}
