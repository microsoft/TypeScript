//// [tests/cases/compiler/es5-asyncFunctionNestedLoops.ts] ////

//// [es5-asyncFunctionNestedLoops.ts]
declare var x, y, z, a, b, c;

async function nestedLoops() {
    A: while (x) {
        await y;
        while (z) {
            continue A;
        }
        while (a) {
            continue;
        }
    }
}

//// [es5-asyncFunctionNestedLoops.js]
function nestedLoops() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!x) return [3 /*break*/, 2];
                    return [4 /*yield*/, y];
                case 1:
                    _a.sent();
                    while (z) {
                        return [3 /*break*/, 0];
                    }
                    while (a) {
                        continue;
                    }
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
