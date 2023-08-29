//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration1_es6.ts] ////

//// [asyncFunctionDeclaration1_es6.ts]
async function foo(): Promise<void> {
}

//// [asyncFunctionDeclaration1_es6.js]
function foo() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
