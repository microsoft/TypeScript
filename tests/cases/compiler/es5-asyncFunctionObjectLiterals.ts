// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function objectLiteral0() {
    x = {
        a: await y,
        b: z
    };
}

async function objectLiteral1() {
    x = {
        a: y,
        b: await z
    };
}

async function objectLiteral2() {
    x = {
        [await a]: y,
        b: z
    };
}

async function objectLiteral3() {
    x = {
        [a]: await y,
        b: z
    };
}

async function objectLiteral4() {
    x = {
        a: await y,
        [b]: z
    };
}

async function objectLiteral5() {
    x = {
        a: y,
        [await b]: z
    };
}

async function objectLiteral6() {
    x = {
        a: y,
        [b]: await z
    };
}