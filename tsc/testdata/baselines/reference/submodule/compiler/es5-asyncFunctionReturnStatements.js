//// [tests/cases/compiler/es5-asyncFunctionReturnStatements.ts] ////

//// [es5-asyncFunctionReturnStatements.ts]
declare var x, y, z, a, b, c;

async function returnStatement0(): Promise<any> {
    return;
}

async function returnStatement1(): Promise<any> {
    return x;
}

async function returnStatement2(): Promise<any> {
    return await x;
}

async function returnStatement3(): Promise<any> {
    { return; }
}

async function returnStatement4(): Promise<any> {
    await x;
    { return; }
}

async function returnStatement5(): Promise<any>{
    { return await x; }
}

//// [es5-asyncFunctionReturnStatements.js]
async function returnStatement0() {
    return;
}
async function returnStatement1() {
    return x;
}
async function returnStatement2() {
    return await x;
}
async function returnStatement3() {
    {
        return;
    }
}
async function returnStatement4() {
    await x;
    {
        return;
    }
}
async function returnStatement5() {
    {
        return await x;
    }
}
