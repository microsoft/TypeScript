// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @allowUnreachableCode: true
// @target: ES5
declare var x, y, z, a, b, c;

async function binaryPlus0() {
    (await x) + y;
}

async function binaryPlus1() {
    x + await y;
}

async function binaryLogicalAnd0() {
    (await x) && y;
}

async function binaryLogicalAnd1() {
    x && await y;
}

async function binaryAssignment0() {
    x = await y;
}

async function binaryAssignment1() {
    x.a = await y;
}

async function binaryAssignment2() {
    x.a.b = await y;
}

async function binaryAssignment3() {
    x[z] = await y;
}

async function binaryAssignment4() {
    x[z].b = await y;
}

async function binaryAssignment5() {
    x.a[z] = await y;
}

async function binaryAssignment6() {
    (await x).a = y;
}

async function binaryAssignment7() {
    (await x.a).b = y;
}

async function binaryAssignment8() {
    (await x)[z] = y;
}

async function binaryAssignment9() {
    x[await z] = y;
}

async function binaryAssignment10() {
    x[await z].b = y;
}

async function binaryAssignment11() {
    (await x[z]).b = y;
}

async function binaryAssignment12() {
    x.a[await z] = y;
}

async function binaryAssignment13() {
    (await x.a)[z] = y;
}

async function binaryCompoundAssignment0() {
    x += await y;
}

async function binaryCompoundAssignment1() {
    x.a += await y;
}

async function binaryCompoundAssignment2() {
    x[a] += await y;
}

async function binaryCompoundAssignment3() {
    (await x).a += y;
}

async function binaryCompoundAssignment4() {
    (await x)[a] += y;
}

async function binaryCompoundAssignment5() {
    x[await a] += y;
}

async function binaryCompoundAssignment6() {
    (await x).a += await y;
}

async function binaryCompoundAssignment7() {
    (await x)[a] += await y;
}

async function binaryCompoundAssignment8() {
    x[await a] += await y;
}

async function binaryExponentiation() {
    (await x) ** y;
    x ** await y;
}

async function binaryComma0() {
    return (await x), y;
}

async function binaryComma1(): Promise<any> {
    return x, await y;
}