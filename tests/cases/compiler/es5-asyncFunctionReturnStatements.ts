// @lib: es5,es2015.promise
// @noEmitHelpers: true
// @target: ES5
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