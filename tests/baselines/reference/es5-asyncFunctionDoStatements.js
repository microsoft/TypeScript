//// [es5-asyncFunctionDoStatements.ts]
declare var x, y, z, a, b, c;

async function doStatement0() {
    do { x; } while (y);
}

async function doStatement1() {
    do { await x; } while (y);
}

async function doStatement2() {
    do { x; } while (await y);
}

async function doStatement3() {
    do { continue; } while (y);
}

async function doStatement4() {
    do { await x; continue; } while (y);
}

async function doStatement5() {
    do { if (1) continue; await x; } while (y);
}

async function doStatement6() {
    do { continue; } while (await y);
}

async function doStatement7() {
    A: do { continue A; } while (y);
}

async function doStatement8() {
    B: do { await x; continue B; } while (y);
}

async function doStatement9() {
    C: do { if (1) continue C; await x; } while (y);
}

async function doStatement10() {
    D: do { continue D; } while (await y);
}

async function doStatement11() {
    do { break; } while (y);
}

async function doStatement12() {
    do { await x; break; } while (y);
}

async function doStatement13() {
    do { if (1) break; await x; } while (y);
}

async function doStatement14() {
    do { break; } while (await y);
}

async function doStatement15() {
    E: do { break E; } while (y);
}

async function doStatement16() {
    F: do { await x; break F; } while (y);
}

async function doStatement17() {
    G: do { if (1) break G; await x; } while (y);
}

async function doStatement18() {
    H: do { break H; } while (await y);
}

//// [es5-asyncFunctionDoStatements.js]
function doStatement0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            do {
                x;
            } while (y);
            return [2 /*return*/];
        });
    });
}
function doStatement1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    x;
                    _a.label = 1;
                case 1: return [4 /*yield*/, y];
                case 2:
                    if (_a.sent()) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            do {
                continue;
            } while (y);
            return [2 /*return*/];
        });
    });
}
function doStatement4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement5() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (1)
                        return [3 /*break*/, 2];
                    return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement6() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [3 /*break*/, 1];
                case 1: return [4 /*yield*/, y];
                case 2:
                    if (_a.sent()) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement7() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            A: do {
                continue A;
            } while (y);
            return [2 /*return*/];
        });
    });
}
function doStatement8() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement9() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (1)
                        return [3 /*break*/, 2];
                    return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement10() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [3 /*break*/, 1];
                case 1: return [4 /*yield*/, y];
                case 2:
                    if (_a.sent()) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement11() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            do {
                break;
            } while (y);
            return [2 /*return*/];
        });
    });
}
function doStatement12() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement13() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (1)
                        return [3 /*break*/, 3];
                    return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement14() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, y];
                case 2:
                    if (_a.sent()) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement15() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            E: do {
                break E;
            } while (y);
            return [2 /*return*/];
        });
    });
}
function doStatement16() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement17() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (1)
                        return [3 /*break*/, 3];
                    return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement18() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, y];
                case 2:
                    if (_a.sent()) return [3 /*break*/, 0];
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
