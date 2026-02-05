//// [tests/cases/compiler/es5-asyncFunctionWithStatements.ts] ////

//// [es5-asyncFunctionWithStatements.ts]
declare var x, y, z, a, b, c;

async function withStatement0() {
    with (x) {
        y;
    }
}

async function withStatement1() {
    with (await x) {
        y;
    }
}

async function withStatement2() {
    with (x) {
        a;
        await y;
        b;
    }
}

async function withStatement3() {
    with (x) {
        with (z) {
            a;
            await y;
            b;
        }
    }
}

//// [es5-asyncFunctionWithStatements.js]
async function withStatement0() {
    with (x) {
        y;
    }
}
async function withStatement1() {
    with (await x) {
        y;
    }
}
async function withStatement2() {
    with (x) {
        a;
        await y;
        b;
    }
}
async function withStatement3() {
    with (x) {
        with (z) {
            a;
            await y;
            b;
        }
    }
}
