//// [asyncFunctionDeclaration10_es6.ts]
async function foo(a = await => await): Promise<void> {
}

//// [asyncFunctionDeclaration10_es6.js]
function foo(a = await => await) {
    return __awaiter(function* () {
    }, this, void 0, Promise);
}
