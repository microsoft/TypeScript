// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
declare var x, y, z, a, b, c;

async function newExpression0() {
    await new x(y, z);
}

async function newExpression1() {
    new (await x)(y, z);
}

async function newExpression2() {
    new x(await y, z);
}

async function newExpression3() {
    new x(y, await z);
}

async function newExpression4() {
    await new x(...y, z);
}

async function newExpression5() {
    new (await x)(...y, z);
}

async function newExpression6() {
    new x(...(await y), z);
}

async function newExpression7() {
    new x(...y, await z);
}

async function newExpression8() {
    new x(await y, ...z);
}

async function newExpression9() {
    new x(y, ...(await z));
}

async function newExpression10() {
    await new x.a(y, z);
}

async function newExpression11() {
    new (await x.a)(y, z);
}

async function newExpression12() {
    new (await x).a(y, z);
}

async function newExpression13() {
    new x.a(await y, z);
}

async function newExpression14() {
    new x.a(y, await z);
}

async function newExpression15() {
    await new x[a](y, z);
}

async function newExpression16() {
    new (await x[a])(y, z);
}

async function newExpression17() {
    new (await x)[a](y, z);
}

async function newExpression18() {
    new x[await a](y, z);
}

async function newExpression19() {
    new x[a](await y, z);
}

async function newExpression20() {
    new x[a](y, await z);
}