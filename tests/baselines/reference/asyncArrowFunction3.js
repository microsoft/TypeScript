//// [asyncArrowFunction3.ts]
function f(await = await) {
}

//// [asyncArrowFunction3.js]
function f(await) {
    if (await === void 0) { await = await; }
}
