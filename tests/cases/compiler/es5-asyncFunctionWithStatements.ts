// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
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