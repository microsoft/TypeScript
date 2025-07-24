// @target: es2018

async function testNonNullWithAwait() {
    const result = (await null as any)!;
    return result;
}

async function testNonNullWithComplexExpression() {
    const obj = { prop: Promise.resolve("test") };
    const result = (await obj.prop as string)!;
    return result;
}