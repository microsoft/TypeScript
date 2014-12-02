//// [asyncFunctionDeclaration3_es6.ts]
function f(await = await) {
}

//// [asyncFunctionDeclaration3_es6.js]
function f(await) {
    if (await === void 0) { await = await; }
}
