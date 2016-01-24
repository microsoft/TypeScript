//// [asyncFunctionDeclaration6_es6.ts]
async function foo(a = await): Promise<void> {
}

//// [asyncFunctionDeclaration6_es6.js]
function foo(a = yield ) {
    return __awaiter(this, void 0, Promise, function* () {
    });
}
