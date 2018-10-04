// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function callExpression0() {
    await x(y, z);
}

async function callExpression1() {
    (await x)(y, z);
}

async function callExpression2() {
    x(await y, z);
}

async function callExpression3() {
    x(y, await z);
}

async function callExpression4() {
    await x(...y, z);
}

async function callExpression5() {
    (await x)(...y, z);
}

async function callExpression6() {
    x(...(await y), z);
}

async function callExpression7() {
    x(...y, await z);
}

async function callExpression8() {
    x(await y, ...z);
}

async function callExpression9() {
    x(y, ...(await z));
}

async function callExpression10() {
    await x.a(y, z);
}

async function callExpression11() {
    (await x.a)(y, z);
}

async function callExpression12() {
    (await x).a(y, z);
}

async function callExpression13() {
    x.a(await y, z);
}

async function callExpression14() {
    x.a(y, await z);
}

async function callExpression15() {
    await x[a](y, z);
}

async function callExpression16() {
    (await x[a])(y, z);
}

async function callExpression17() {
    (await x)[a](y, z);
}

async function callExpression18() {
    x[await a](y, z);
}

async function callExpression19() {
    x[a](await y, z);
}

async function callExpression20() {
    x[a](y, await z);
}
