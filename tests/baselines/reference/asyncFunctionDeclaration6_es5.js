//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclaration6_es5.ts] ////

//// [asyncFunctionDeclaration6_es5.ts]
async function foo(a = await): Promise<void> {
}

//// [asyncFunctionDeclaration6_es5.js]
function foo() {
    return __awaiter(this, arguments, void 0, function (a) {
        if (a === void 0) { a = _a.sent(); }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ];
                case 1: return [2 /*return*/];
            }
        });
    });
}
