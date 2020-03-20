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
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    x;
                    _c.label = 1;
                case 1: return [4 /*yield*/, y];
                case 2:
                    if (_c.sent()) return [3 /*break*/, 0];
                    _c.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_d) {
            do {
                continue;
            } while (y);
            return [2 /*return*/];
        });
    });
}
function doStatement4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _e.sent();
                    return [3 /*break*/, 2];
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _e.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement5() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (1)
                        return [3 /*break*/, 2];
                    return [4 /*yield*/, x];
                case 1:
                    _f.sent();
                    _f.label = 2;
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _f.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement6() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [3 /*break*/, 1];
                case 1: return [4 /*yield*/, y];
                case 2:
                    if (_g.sent()) return [3 /*break*/, 0];
                    _g.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement7() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_h) {
            A: do {
                continue A;
            } while (y);
            return [2 /*return*/];
        });
    });
}
function doStatement8() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _j.sent();
                    return [3 /*break*/, 2];
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _j.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement9() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (1)
                        return [3 /*break*/, 2];
                    return [4 /*yield*/, x];
                case 1:
                    _k.sent();
                    _k.label = 2;
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _k.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement10() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0: return [3 /*break*/, 1];
                case 1: return [4 /*yield*/, y];
                case 2:
                    if (_l.sent()) return [3 /*break*/, 0];
                    _l.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement11() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_m) {
            do {
                break;
            } while (y);
            return [2 /*return*/];
        });
    });
}
function doStatement12() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _o.sent();
                    return [3 /*break*/, 3];
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _o.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement13() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    if (1)
                        return [3 /*break*/, 3];
                    return [4 /*yield*/, x];
                case 1:
                    _p.sent();
                    _p.label = 2;
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _p.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement14() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0: return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, y];
                case 2:
                    if (_q.sent()) return [3 /*break*/, 0];
                    _q.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement15() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_r) {
            E: do {
                break E;
            } while (y);
            return [2 /*return*/];
        });
    });
}
function doStatement16() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_s) {
            switch (_s.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _s.sent();
                    return [3 /*break*/, 3];
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _s.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement17() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_t) {
            switch (_t.label) {
                case 0:
                    if (1)
                        return [3 /*break*/, 3];
                    return [4 /*yield*/, x];
                case 1:
                    _t.sent();
                    _t.label = 2;
                case 2:
                    if (y) return [3 /*break*/, 0];
                    _t.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function doStatement18() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_u) {
            switch (_u.label) {
                case 0: return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, y];
                case 2:
                    if (_u.sent()) return [3 /*break*/, 0];
                    _u.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
