//// [es5-asyncFunctionWhileStatements.ts]
declare var x, y, z, a, b, c;

async function whileStatement0() {
    while (x) { y; }
}

async function whileStatement1() {
    while (await x) { y; }
}

async function whileStatement2() {
    while (x) { await y; }
}

async function whileStatement3() {
    while (x) { continue; }
}

async function whileStatement4() {
    while (await x) { continue; }
}

async function whileStatement5() {
    while (x) { await y; continue; }
}

async function whileStatement6() {
    while (x) { if (1) continue; await y; }
}

async function whileStatement7() {
    A: while (x) { continue A; }
}

async function whileStatement8() {
    B: while (await x) { continue B; }
}

async function whileStatement9() {
    C: while (x) { await y; continue C; }
}

async function whileStatement10() {
    D: while (x) { if (1) continue D; await y; }
}

async function whileStatement11() {
    while (x) { break; }
}

async function whileStatement12() {
    while (await x) { break; }
}

async function whileStatement13() {
    while (x) { await y; break; }
}

async function whileStatement14() {
    while (x) { if (1) break; await y; }
}

async function whileStatement15() {
    E: while (x) { break E; }
}

async function whileStatement16() {
    F: while (await x) { break F; }
}

async function whileStatement17() {
    G: while (x) { await y; break G; }
}

async function whileStatement18() {
    H: while (x) { if (1) break H; await y; }
}

//// [es5-asyncFunctionWhileStatements.js]
function whileStatement0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            while (x) {
                y;
            }
            return [2 /*return*/];
        });
    });
}
function whileStatement1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    if (!_b.sent()) return [3 /*break*/, 2];
                    y;
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!x) return [3 /*break*/, 2];
                    return [4 /*yield*/, y];
                case 1:
                    _c.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_d) {
            while (x) {
                continue;
            }
            return [2 /*return*/];
        });
    });
}
function whileStatement4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    if (!_e.sent()) return [3 /*break*/, 2];
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement5() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!x) return [3 /*break*/, 2];
                    return [4 /*yield*/, y];
                case 1:
                    _f.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement6() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (!x) return [3 /*break*/, 2];
                    if (1)
                        return [3 /*break*/, 0];
                    return [4 /*yield*/, y];
                case 1:
                    _g.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement7() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_h) {
            A: while (x) {
                continue A;
            }
            return [2 /*return*/];
        });
    });
}
function whileStatement8() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    if (!_j.sent()) return [3 /*break*/, 2];
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement9() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!x) return [3 /*break*/, 2];
                    return [4 /*yield*/, y];
                case 1:
                    _k.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement10() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    if (!x) return [3 /*break*/, 2];
                    if (1)
                        return [3 /*break*/, 0];
                    return [4 /*yield*/, y];
                case 1:
                    _l.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement11() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_m) {
            while (x) {
                break;
            }
            return [2 /*return*/];
        });
    });
}
function whileStatement12() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    if (!_o.sent()) return [3 /*break*/, 2];
                    return [3 /*break*/, 2];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement13() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    if (!x) return [3 /*break*/, 2];
                    return [4 /*yield*/, y];
                case 1:
                    _p.sent();
                    return [3 /*break*/, 2];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement14() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    if (!x) return [3 /*break*/, 2];
                    if (1)
                        return [3 /*break*/, 2];
                    return [4 /*yield*/, y];
                case 1:
                    _q.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement15() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_r) {
            E: while (x) {
                break E;
            }
            return [2 /*return*/];
        });
    });
}
function whileStatement16() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_s) {
            switch (_s.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    if (!_s.sent()) return [3 /*break*/, 2];
                    return [3 /*break*/, 2];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement17() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_t) {
            switch (_t.label) {
                case 0:
                    if (!x) return [3 /*break*/, 2];
                    return [4 /*yield*/, y];
                case 1:
                    _t.sent();
                    return [3 /*break*/, 2];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function whileStatement18() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_u) {
            switch (_u.label) {
                case 0:
                    if (!x) return [3 /*break*/, 2];
                    if (1)
                        return [3 /*break*/, 2];
                    return [4 /*yield*/, y];
                case 1:
                    _u.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
