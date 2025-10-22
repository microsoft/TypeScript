//// [tests/cases/compiler/partiallyEmittedExpressionLeftHandSide.ts] ////

//// [partiallyEmittedExpressionLeftHandSide.ts]
async function testNonNullWithAwait() {
    const result = (await null as any)!;
    return result;
}

async function testNonNullWithComplexExpression() {
    const obj = { prop: Promise.resolve("test") };
    const result = (await obj.prop as string)!;
    return result;
}

//// [partiallyEmittedExpressionLeftHandSide.js]
async function testNonNullWithAwait() {
    const result = await null;
    return result;
}
async function testNonNullWithComplexExpression() {
    const obj = { prop: Promise.resolve("test") };
    const result = await obj.prop;
    return result;
}
