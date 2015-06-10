//// [asyncFunctionDeclaration6_es6.ts]
async function foo(a = await): Promise<void> {
}

//// [asyncFunctionDeclaration6_es6.js]
function foo(a = await) {
    return __awaiter(function* () {
    },
    this, void 0, Promise);
}
