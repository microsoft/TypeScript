//// [es5-asyncFunctionForOfStatements.ts]
declare var x, y, z, a, b, c;

async function forOfStatement0() {
    for (x of y) { z; }
}

async function forOfStatement1() {
    for (x of await y) { z; }
}

async function forOfStatement2() {
    for (x of y) { await z; }
}

async function forOfStatement3() {
    for ((await x).a of y) { z; }
}

async function forOfStatement4() {
    for (x.a of await y) { z; }
}

async function forOfStatement5() {
    for (x.a of y) { await z; }
}

async function forOfStatement6() {
    for (var b of y) { z; }
}

async function forOfStatement7() {
    for (var c of await y) { z; }
}

async function forOfStatement8() {
    for (var d of y) { await z; }
}

async function forOfStatement9() {
    for ([x] of await y) { z; }
}

async function forOfStatement10() {
    for ([x] of y) { await z; }
}

async function forOfStatement11() {
    for ([x = await a] of y) { z; }
}

async function forOfStatement12() {
    for ([x = a] of await y) { z; }
}

async function forOfStatement13() {
    for ([x = a] of y) { await z; }
}

async function forOfStatement14() {
    for ({ x } of await y) { z; }
}

async function forOfStatement15() {
    for ({ x } of y) { await z; }
}

async function forOfStatement16() {
    for ({ x = await a } of y) { z; }
}

async function forOfStatement17() {
    for ({ x = a } of await y) { z; }
}

async function forOfStatement18() {
    for ({ x = a } of y) { await z; }
}

//// [es5-asyncFunctionForOfStatements.js]
function forOfStatement0() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_1;
        return __generator(this, function (_a) {
            for (_i = 0, y_1 = y; _i < y_1.length; _i++) {
                x = y_1[_i];
                z;
            }
            return [2 /*return*/];
        });
    });
}
function forOfStatement1() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _a = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    x = _a[_i];
                    z;
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, y_2 = y;
                    _a.label = 1;
                case 1:
                    if (!(_i < y_2.length)) return [3 /*break*/, 4];
                    x = y_2[_i];
                    return [4 /*yield*/, z];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, y_3 = y;
                    _a.label = 1;
                case 1:
                    if (!(_i < y_3.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, x];
                case 2:
                    (_a.sent()).a = y_3[_i];
                    z;
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement4() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _a = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    x.a = _a[_i];
                    z;
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement5() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, y_4 = y;
                    _a.label = 1;
                case 1:
                    if (!(_i < y_4.length)) return [3 /*break*/, 4];
                    x.a = y_4[_i];
                    return [4 /*yield*/, z];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement6() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_5, b;
        return __generator(this, function (_a) {
            for (_i = 0, y_5 = y; _i < y_5.length; _i++) {
                b = y_5[_i];
                z;
            }
            return [2 /*return*/];
        });
    });
}
function forOfStatement7() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, c;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _a = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    c = _a[_i];
                    z;
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement8() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_6, d;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, y_6 = y;
                    _a.label = 1;
                case 1:
                    if (!(_i < y_6.length)) return [3 /*break*/, 4];
                    d = y_6[_i];
                    return [4 /*yield*/, z];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement9() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _a = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    x = _a[_i][0];
                    z;
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement10() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, y_7 = y;
                    _a.label = 1;
                case 1:
                    if (!(_i < y_7.length)) return [3 /*break*/, 4];
                    x = y_7[_i][0];
                    return [4 /*yield*/, z];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement11() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_8, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _i = 0, y_8 = y;
                    _c.label = 1;
                case 1:
                    if (!(_i < y_8.length)) return [3 /*break*/, 6];
                    _b = y_8[_i][0];
                    if (!(_b === void 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, a];
                case 2:
                    _a = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b;
                    _c.label = 4;
                case 4:
                    x = _a;
                    z;
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement12() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _a = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    _b = _a[_i][0], x = _b === void 0 ? a : _b;
                    z;
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement13() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_9;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, y_9 = y;
                    _b.label = 1;
                case 1:
                    if (!(_i < y_9.length)) return [3 /*break*/, 4];
                    _a = y_9[_i][0], x = _a === void 0 ? a : _a;
                    return [4 /*yield*/, z];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement14() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _a = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    x = _a[_i].x;
                    z;
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement15() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, y_10 = y;
                    _a.label = 1;
                case 1:
                    if (!(_i < y_10.length)) return [3 /*break*/, 4];
                    x = y_10[_i].x;
                    return [4 /*yield*/, z];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement16() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_11, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _i = 0, y_11 = y;
                    _c.label = 1;
                case 1:
                    if (!(_i < y_11.length)) return [3 /*break*/, 6];
                    _b = y_11[_i].x;
                    if (!(_b === void 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, a];
                case 2:
                    _a = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b;
                    _c.label = 4;
                case 4:
                    x = _a;
                    z;
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement17() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _a = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    _b = _a[_i].x, x = _b === void 0 ? a : _b;
                    z;
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement18() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_12;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, y_12 = y;
                    _b.label = 1;
                case 1:
                    if (!(_i < y_12.length)) return [3 /*break*/, 4];
                    _a = y_12[_i].x, x = _a === void 0 ? a : _a;
                    return [4 /*yield*/, z];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
