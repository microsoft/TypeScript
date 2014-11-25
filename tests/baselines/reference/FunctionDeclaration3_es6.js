//// [FunctionDeclaration3_es6.ts]
function f(yield = yield) {
}

//// [FunctionDeclaration3_es6.js]
function f(yield) {
    if (yield === void 0) { yield = yield; }
}
