//// [asyncFunctionDeclaration3.ts]
function f(await = await) {
}

//// [asyncFunctionDeclaration3.js]
function f(await) {
    if (await === void 0) { await = await; }
}
