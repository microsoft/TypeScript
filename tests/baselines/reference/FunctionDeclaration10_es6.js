//// [FunctionDeclaration10_es6.ts]
function * foo(a = yield => yield) {
}

//// [FunctionDeclaration10_es6.js]
function foo(a) {
    if (a === void 0) { a = function (yield) { return yield; }; }
}
