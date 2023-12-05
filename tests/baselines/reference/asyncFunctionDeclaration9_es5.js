//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclaration9_es5.ts] ////

//// [asyncFunctionDeclaration9_es5.ts]
async function foo(): Promise<void> {
  var v = { [await]: foo }
}

//// [asyncFunctionDeclaration9_es5.js]
function foo() {
    return __awaiter(this, void 0, void 0, function () {
        var v;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = {};
                    return [4 /*yield*/, ];
                case 1:
                    v = (_a[_b.sent()] = foo, _a);
                    return [2 /*return*/];
            }
        });
    });
}
