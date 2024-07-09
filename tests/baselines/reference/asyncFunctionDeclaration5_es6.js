//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration5_es6.ts] ////

//// [asyncFunctionDeclaration5_es6.ts]
async function foo(await): Promise<void> {
}

//// [asyncFunctionDeclaration5_es6.js]
function foo(await) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
