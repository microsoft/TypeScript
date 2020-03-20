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
        var _i, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _b = _c.sent();
                    _c.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    x = _b[_i];
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
function forOfStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, y_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _i = 0, y_2 = y;
                    _d.label = 1;
                case 1:
                    if (!(_i < y_2.length)) return [3 /*break*/, 4];
                    x = y_2[_i];
                    return [4 /*yield*/, z];
                case 2:
                    _d.sent();
                    _d.label = 3;
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
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _i = 0, y_3 = y;
                    _e.label = 1;
                case 1:
                    if (!(_i < y_3.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, x];
                case 2:
                    (_e.sent()).a = y_3[_i];
                    z;
                    _e.label = 3;
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
        var _i, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _f = _g.sent();
                    _g.label = 2;
                case 2:
                    if (!(_i < _f.length)) return [3 /*break*/, 4];
                    x.a = _f[_i];
                    z;
                    _g.label = 3;
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
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _i = 0, y_4 = y;
                    _h.label = 1;
                case 1:
                    if (!(_i < y_4.length)) return [3 /*break*/, 4];
                    x.a = y_4[_i];
                    return [4 /*yield*/, z];
                case 2:
                    _h.sent();
                    _h.label = 3;
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
        return __generator(this, function (_j) {
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
        var _i, _k, c;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _k = _l.sent();
                    _l.label = 2;
                case 2:
                    if (!(_i < _k.length)) return [3 /*break*/, 4];
                    c = _k[_i];
                    z;
                    _l.label = 3;
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
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    _i = 0, y_6 = y;
                    _m.label = 1;
                case 1:
                    if (!(_i < y_6.length)) return [3 /*break*/, 4];
                    d = y_6[_i];
                    return [4 /*yield*/, z];
                case 2:
                    _m.sent();
                    _m.label = 3;
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
        var _i, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _o = _p.sent();
                    _p.label = 2;
                case 2:
                    if (!(_i < _o.length)) return [3 /*break*/, 4];
                    x = _o[_i][0];
                    z;
                    _p.label = 3;
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
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    _i = 0, y_7 = y;
                    _q.label = 1;
                case 1:
                    if (!(_i < y_7.length)) return [3 /*break*/, 4];
                    x = y_7[_i][0];
                    return [4 /*yield*/, z];
                case 2:
                    _q.sent();
                    _q.label = 3;
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
        var _i, y_8, _r;
        var _s;
        return __generator(this, function (_t) {
            switch (_t.label) {
                case 0:
                    _i = 0, y_8 = y;
                    _t.label = 1;
                case 1:
                    if (!(_i < y_8.length)) return [3 /*break*/, 6];
                    _s = y_8[_i][0];
                    if (!(_s === void 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, a];
                case 2:
                    _r = _t.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _r = _s;
                    _t.label = 4;
                case 4:
                    x = _r;
                    z;
                    _t.label = 5;
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
        var _i, _u;
        var _v;
        return __generator(this, function (_w) {
            switch (_w.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _u = _w.sent();
                    _w.label = 2;
                case 2:
                    if (!(_i < _u.length)) return [3 /*break*/, 4];
                    _v = _u[_i][0], x = _v === void 0 ? a : _v;
                    z;
                    _w.label = 3;
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
        var _x;
        return __generator(this, function (_y) {
            switch (_y.label) {
                case 0:
                    _i = 0, y_9 = y;
                    _y.label = 1;
                case 1:
                    if (!(_i < y_9.length)) return [3 /*break*/, 4];
                    _x = y_9[_i][0], x = _x === void 0 ? a : _x;
                    return [4 /*yield*/, z];
                case 2:
                    _y.sent();
                    _y.label = 3;
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
        var _i, _z;
        return __generator(this, function (_0) {
            switch (_0.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _z = _0.sent();
                    _0.label = 2;
                case 2:
                    if (!(_i < _z.length)) return [3 /*break*/, 4];
                    x = _z[_i].x;
                    z;
                    _0.label = 3;
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
        return __generator(this, function (_1) {
            switch (_1.label) {
                case 0:
                    _i = 0, y_10 = y;
                    _1.label = 1;
                case 1:
                    if (!(_i < y_10.length)) return [3 /*break*/, 4];
                    x = y_10[_i].x;
                    return [4 /*yield*/, z];
                case 2:
                    _1.sent();
                    _1.label = 3;
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
        var _i, y_11, _2;
        var _3;
        return __generator(this, function (_4) {
            switch (_4.label) {
                case 0:
                    _i = 0, y_11 = y;
                    _4.label = 1;
                case 1:
                    if (!(_i < y_11.length)) return [3 /*break*/, 6];
                    _3 = y_11[_i].x;
                    if (!(_3 === void 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, a];
                case 2:
                    _2 = _4.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _2 = _3;
                    _4.label = 4;
                case 4:
                    x = _2;
                    z;
                    _4.label = 5;
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
        var _i, _5;
        var _6;
        return __generator(this, function (_7) {
            switch (_7.label) {
                case 0:
                    _i = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _5 = _7.sent();
                    _7.label = 2;
                case 2:
                    if (!(_i < _5.length)) return [3 /*break*/, 4];
                    _6 = _5[_i].x, x = _6 === void 0 ? a : _6;
                    z;
                    _7.label = 3;
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
        var _8;
        return __generator(this, function (_9) {
            switch (_9.label) {
                case 0:
                    _i = 0, y_12 = y;
                    _9.label = 1;
                case 1:
                    if (!(_i < y_12.length)) return [3 /*break*/, 4];
                    _8 = y_12[_i].x, x = _8 === void 0 ? a : _8;
                    return [4 /*yield*/, z];
                case 2:
                    _9.sent();
                    _9.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
