//// [tests/cases/compiler/es5-asyncFunctionPropertyAccess.ts] ////

//// [es5-asyncFunctionPropertyAccess.ts]
declare var x, y, z, a, b, c;

async function propertyAccess0() {
    y = await x.a;
}

async function propertyAccess1() {
    y = (await x).a;
}

async function callExpression0() {
    await x(y, z);
}

//// [es5-asyncFunctionPropertyAccess.js]
async function propertyAccess0() {
    y = await x.a;
}
async function propertyAccess1() {
    y = (await x).a;
}
async function callExpression0() {
    await x(y, z);
}
