//// [asyncFunctionDeclaration12_es5.ts]
var v = async function await(): Promise<void> { }

//// [asyncFunctionDeclaration12_es5.js]
var v = function await() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
};
