//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclaration5_es5.ts] ////

//// [asyncFunctionDeclaration5_es5.ts]
async function foo(await): Promise<void> {
}

//// [asyncFunctionDeclaration5_es5.js]
function foo(await) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
