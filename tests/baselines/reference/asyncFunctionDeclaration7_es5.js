//// [asyncFunctionDeclaration7_es5.ts]
async function bar(): Promise<void> {
  // 'await' here is an identifier, and not a yield expression.
  async function foo(a = await): Promise<void> {
  }
}

//// [asyncFunctionDeclaration7_es5.js]
function bar() {
    return __awaiter(this, void 0, void 0, function () {
        // 'await' here is an identifier, and not a yield expression.
        function foo(a) {
            if (a === void 0) { a = yield ; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        }
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
