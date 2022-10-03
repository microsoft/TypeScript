//// [asyncFunctionDeclaration1_es5.ts]
async function foo(): Promise<void> {
}

//// [asyncFunctionDeclaration1_es5.js]
function foo() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
