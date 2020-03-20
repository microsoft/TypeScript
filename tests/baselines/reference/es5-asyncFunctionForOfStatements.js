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
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _c = _d.sent();
                    _d.label = 2;
                case 2:
                    if (!(_b < _c.length)) return [3 /*break*/, 4];
                    x = _c[_b];
                    z;
                    _d.label = 3;
                case 3:
                    _b++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        var _e, y_2;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _e = 0, y_2 = y;
                    _f.label = 1;
                case 1:
                    if (!(_e < y_2.length)) return [3 /*break*/, 4];
                    x = y_2[_e];
                    return [4 /*yield*/, z];
                case 2:
                    _f.sent();
                    _f.label = 3;
                case 3:
                    _e++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        var _g, y_3;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _g = 0, y_3 = y;
                    _h.label = 1;
                case 1:
                    if (!(_g < y_3.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, x];
                case 2:
                    (_h.sent()).a = y_3[_g];
                    z;
                    _h.label = 3;
                case 3:
                    _g++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement4() {
    return __awaiter(this, void 0, void 0, function () {
        var _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    _j = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _k = _l.sent();
                    _l.label = 2;
                case 2:
                    if (!(_j < _k.length)) return [3 /*break*/, 4];
                    x.a = _k[_j];
                    z;
                    _l.label = 3;
                case 3:
                    _j++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement5() {
    return __awaiter(this, void 0, void 0, function () {
        var _m, y_4;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    _m = 0, y_4 = y;
                    _o.label = 1;
                case 1:
                    if (!(_m < y_4.length)) return [3 /*break*/, 4];
                    x.a = y_4[_m];
                    return [4 /*yield*/, z];
                case 2:
                    _o.sent();
                    _o.label = 3;
                case 3:
                    _m++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement6() {
    return __awaiter(this, void 0, void 0, function () {
        var _p, y_5, b;
        return __generator(this, function (_q) {
            for (_p = 0, y_5 = y; _p < y_5.length; _p++) {
                b = y_5[_p];
                z;
            }
            return [2 /*return*/];
        });
    });
}
function forOfStatement7() {
    return __awaiter(this, void 0, void 0, function () {
        var _r, _s, c;
        return __generator(this, function (_t) {
            switch (_t.label) {
                case 0:
                    _r = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _s = _t.sent();
                    _t.label = 2;
                case 2:
                    if (!(_r < _s.length)) return [3 /*break*/, 4];
                    c = _s[_r];
                    z;
                    _t.label = 3;
                case 3:
                    _r++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement8() {
    return __awaiter(this, void 0, void 0, function () {
        var _u, y_6, d;
        return __generator(this, function (_v) {
            switch (_v.label) {
                case 0:
                    _u = 0, y_6 = y;
                    _v.label = 1;
                case 1:
                    if (!(_u < y_6.length)) return [3 /*break*/, 4];
                    d = y_6[_u];
                    return [4 /*yield*/, z];
                case 2:
                    _v.sent();
                    _v.label = 3;
                case 3:
                    _u++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement9() {
    return __awaiter(this, void 0, void 0, function () {
        var _w, _x;
        return __generator(this, function (_y) {
            switch (_y.label) {
                case 0:
                    _w = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _x = _y.sent();
                    _y.label = 2;
                case 2:
                    if (!(_w < _x.length)) return [3 /*break*/, 4];
                    x = _x[_w][0];
                    z;
                    _y.label = 3;
                case 3:
                    _w++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement10() {
    return __awaiter(this, void 0, void 0, function () {
        var _z, y_7;
        return __generator(this, function (_0) {
            switch (_0.label) {
                case 0:
                    _z = 0, y_7 = y;
                    _0.label = 1;
                case 1:
                    if (!(_z < y_7.length)) return [3 /*break*/, 4];
                    x = y_7[_z][0];
                    return [4 /*yield*/, z];
                case 2:
                    _0.sent();
                    _0.label = 3;
                case 3:
                    _z++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement11() {
    return __awaiter(this, void 0, void 0, function () {
        var _1, y_8, _2;
        var _3;
        return __generator(this, function (_4) {
            switch (_4.label) {
                case 0:
                    _1 = 0, y_8 = y;
                    _4.label = 1;
                case 1:
                    if (!(_1 < y_8.length)) return [3 /*break*/, 6];
                    _3 = y_8[_1][0];
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
                    _1++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement12() {
    return __awaiter(this, void 0, void 0, function () {
        var _5, _6;
        var _7;
        return __generator(this, function (_8) {
            switch (_8.label) {
                case 0:
                    _5 = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _6 = _8.sent();
                    _8.label = 2;
                case 2:
                    if (!(_5 < _6.length)) return [3 /*break*/, 4];
                    _7 = _6[_5][0], x = _7 === void 0 ? a : _7;
                    z;
                    _8.label = 3;
                case 3:
                    _5++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement13() {
    return __awaiter(this, void 0, void 0, function () {
        var _9, y_9;
        var _10;
        return __generator(this, function (_11) {
            switch (_11.label) {
                case 0:
                    _9 = 0, y_9 = y;
                    _11.label = 1;
                case 1:
                    if (!(_9 < y_9.length)) return [3 /*break*/, 4];
                    _10 = y_9[_9][0], x = _10 === void 0 ? a : _10;
                    return [4 /*yield*/, z];
                case 2:
                    _11.sent();
                    _11.label = 3;
                case 3:
                    _9++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement14() {
    return __awaiter(this, void 0, void 0, function () {
        var _12, _13;
        return __generator(this, function (_14) {
            switch (_14.label) {
                case 0:
                    _12 = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _13 = _14.sent();
                    _14.label = 2;
                case 2:
                    if (!(_12 < _13.length)) return [3 /*break*/, 4];
                    x = _13[_12].x;
                    z;
                    _14.label = 3;
                case 3:
                    _12++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement15() {
    return __awaiter(this, void 0, void 0, function () {
        var _15, y_10;
        return __generator(this, function (_16) {
            switch (_16.label) {
                case 0:
                    _15 = 0, y_10 = y;
                    _16.label = 1;
                case 1:
                    if (!(_15 < y_10.length)) return [3 /*break*/, 4];
                    x = y_10[_15].x;
                    return [4 /*yield*/, z];
                case 2:
                    _16.sent();
                    _16.label = 3;
                case 3:
                    _15++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement16() {
    return __awaiter(this, void 0, void 0, function () {
        var _17, y_11, _18;
        var _19;
        return __generator(this, function (_20) {
            switch (_20.label) {
                case 0:
                    _17 = 0, y_11 = y;
                    _20.label = 1;
                case 1:
                    if (!(_17 < y_11.length)) return [3 /*break*/, 6];
                    _19 = y_11[_17].x;
                    if (!(_19 === void 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, a];
                case 2:
                    _18 = _20.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _18 = _19;
                    _20.label = 4;
                case 4:
                    x = _18;
                    z;
                    _20.label = 5;
                case 5:
                    _17++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement17() {
    return __awaiter(this, void 0, void 0, function () {
        var _21, _22;
        var _23;
        return __generator(this, function (_24) {
            switch (_24.label) {
                case 0:
                    _21 = 0;
                    return [4 /*yield*/, y];
                case 1:
                    _22 = _24.sent();
                    _24.label = 2;
                case 2:
                    if (!(_21 < _22.length)) return [3 /*break*/, 4];
                    _23 = _22[_21].x, x = _23 === void 0 ? a : _23;
                    z;
                    _24.label = 3;
                case 3:
                    _21++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement18() {
    return __awaiter(this, void 0, void 0, function () {
        var _25, y_12;
        var _26;
        return __generator(this, function (_27) {
            switch (_27.label) {
                case 0:
                    _25 = 0, y_12 = y;
                    _27.label = 1;
                case 1:
                    if (!(_25 < y_12.length)) return [3 /*break*/, 4];
                    _26 = y_12[_25].x, x = _26 === void 0 ? a : _26;
                    return [4 /*yield*/, z];
                case 2:
                    _27.sent();
                    _27.label = 3;
                case 3:
                    _25++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
