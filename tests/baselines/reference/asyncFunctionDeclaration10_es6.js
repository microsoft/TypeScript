//// [asyncFunctionDeclaration10_es6.ts]
async function foo(a = await => await): Promise<void> {
}

//// [asyncFunctionDeclaration10_es6.js]
function foo(a = yield , await) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
