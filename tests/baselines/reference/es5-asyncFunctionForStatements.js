//// [es5-asyncFunctionForStatements.ts]
declare var x, y, z, a, b, c;

async function forStatement0() {
    for (x; y; z) { a; }
}

async function forStatement1() {
    for (await x; y; z) { a; }
}

async function forStatement2() {
    for (x; await y; z) { a; }
}

async function forStatement3() {
    for (x; y; await z) { a; }
}

async function forStatement4() {
    for (x; y; z) { await a; }
}

async function forStatement5() {
    for (var b; y; z) { a; }
}

async function forStatement6() {
    for (var c = x; y; z) { a; }
}

//// [es5-asyncFunctionForStatements.js]
function forStatement0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            for (x; y; z) {
                a;
            }
            return [2 /*return*/];
        });
    });
}
function forStatement1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!y) return [3 /*break*/, 4];
                    a;
                    _a.label = 3;
                case 3:
                    z;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    x;
                    _a.label = 1;
                case 1: return [4 /*yield*/, y];
                case 2:
                    if (!_a.sent()) return [3 /*break*/, 4];
                    a;
                    _a.label = 3;
                case 3:
                    z;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    x;
                    _a.label = 1;
                case 1:
                    if (!y) return [3 /*break*/, 4];
                    a;
                    _a.label = 2;
                case 2: return [4 /*yield*/, z];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forStatement4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    x;
                    _a.label = 1;
                case 1:
                    if (!y) return [3 /*break*/, 4];
                    return [4 /*yield*/, a];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    z;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forStatement5() {
    return __awaiter(this, void 0, void 0, function () {
        var b;
        return __generator(this, function (_a) {
            for (; y; z) {
                a;
            }
            return [2 /*return*/];
        });
    });
}
function forStatement6() {
    return __awaiter(this, void 0, void 0, function () {
        var c;
        return __generator(this, function (_a) {
            for (c = x; y; z) {
                a;
            }
            return [2 /*return*/];
        });
    });
}
