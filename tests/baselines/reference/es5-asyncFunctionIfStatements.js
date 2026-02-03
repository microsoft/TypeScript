//// [tests/cases/compiler/es5-asyncFunctionIfStatements.ts] ////

//// [es5-asyncFunctionIfStatements.ts]
declare var x, y, z, a, b, c;

async function ifStatement1() {
    if (await x) { y; } else { z; }
}

async function ifStatement2() {
    if (x) { await y; } else { z; }
}

async function ifStatement3() {
    if (x) { y; } else { await z; }
}

//// [es5-asyncFunctionIfStatements.js]
function ifStatement1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    if (_a.sent()) {
                        y;
                    }
                    else {
                        z;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function ifStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!x) return [3 /*break*/, 2];
                    return [4 /*yield*/, y];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    z;
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function ifStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!x) return [3 /*break*/, 1];
                    y;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, z];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
