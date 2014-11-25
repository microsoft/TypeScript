//// [FunctionDeclaration6_es6.ts]
function*foo(a = yield) {
}

//// [FunctionDeclaration6_es6.js]
function foo(a) {
    if (a === void 0) { a = yield; }
}
