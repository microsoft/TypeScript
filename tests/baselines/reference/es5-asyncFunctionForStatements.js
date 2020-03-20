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
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    if (!y) return [3 /*break*/, 4];
                    a;
                    _b.label = 3;
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
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    x;
                    _c.label = 1;
                case 1: return [4 /*yield*/, y];
                case 2:
                    if (!_c.sent()) return [3 /*break*/, 4];
                    a;
                    _c.label = 3;
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
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x;
                    _d.label = 1;
                case 1:
                    if (!y) return [3 /*break*/, 4];
                    a;
                    _d.label = 2;
                case 2: return [4 /*yield*/, z];
                case 3:
                    _d.sent();
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forStatement4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    x;
                    _e.label = 1;
                case 1:
                    if (!y) return [3 /*break*/, 4];
                    return [4 /*yield*/, a];
                case 2:
                    _e.sent();
                    _e.label = 3;
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
        return __generator(this, function (_f) {
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
        return __generator(this, function (_g) {
            for (c = x; y; z) {
                a;
            }
            return [2 /*return*/];
        });
    });
}
