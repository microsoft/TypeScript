//// [asyncFunctionDeclaration6_es5.ts]
async function foo(a = await): Promise<void> {
}

//// [asyncFunctionDeclaration6_es5.js]
function foo(a) {
    if (a === void 0) { a = yield ; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
