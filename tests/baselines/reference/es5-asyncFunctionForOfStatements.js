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
        var y_1, e_1;
        return __generator(this, function (_a) {
            try {
                for (y_1 = { iterator: __values(y) }; __step(y_1);) {
                    x = y_1.result.value;
                    z;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try { __close(y_1); } finally { if (e_1) throw e_1.error; }
            }
            return [2 /*return*/];
        });
    });
}
function forOfStatement1() {
    return __awaiter(this, void 0, void 0, function () {
        var iterator_1, _a, _b, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, 6, 7]);
                    _a = {};
                    return [4 /*yield*/, y];
                case 1:
                    iterator_1 = (_a.iterator = __values.apply(void 0, [_c.sent()]), _a);
                    _c.label = 2;
                case 2:
                    if (!__step(iterator_1))
                        return [3 /*break*/, 4];
                    x = iterator_1.result.value;
                    z;
                    _c.label = 3;
                case 3: return [3 /*break*/, 2];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _b = _c.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(iterator_1); } finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        var y_2, _a, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    y_2 = { iterator: __values(y) };
                    _b.label = 1;
                case 1:
                    if (!__step(y_2))
                        return [3 /*break*/, 4];
                    x = y_2.result.value;
                    return [4 /*yield*/, z];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _a = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(y_2); } finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        var y_3, _a, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    y_3 = { iterator: __values(y) };
                    _b.label = 1;
                case 1:
                    if (!__step(y_3))
                        return [3 /*break*/, 4];
                    return [4 /*yield*/, x];
                case 2:
                    (_b.sent()).a = y_3.result.value;
                    z;
                    _b.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _a = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(y_3); } finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement4() {
    return __awaiter(this, void 0, void 0, function () {
        var iterator_2, _a, _b, e_5;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, 6, 7]);
                    _a = {};
                    return [4 /*yield*/, y];
                case 1:
                    iterator_2 = (_a.iterator = __values.apply(void 0, [_c.sent()]), _a);
                    _c.label = 2;
                case 2:
                    if (!__step(iterator_2))
                        return [3 /*break*/, 4];
                    x.a = iterator_2.result.value;
                    z;
                    _c.label = 3;
                case 3: return [3 /*break*/, 2];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _b = _c.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(iterator_2); } finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement5() {
    return __awaiter(this, void 0, void 0, function () {
        var y_4, _a, e_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    y_4 = { iterator: __values(y) };
                    _b.label = 1;
                case 1:
                    if (!__step(y_4))
                        return [3 /*break*/, 4];
                    x.a = y_4.result.value;
                    return [4 /*yield*/, z];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _a = _b.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(y_4); } finally { if (e_6) throw e_6.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement6() {
    return __awaiter(this, void 0, void 0, function () {
        var y_5, b, e_7;
        return __generator(this, function (_a) {
            try {
                for (y_5 = { iterator: __values(y) }; __step(y_5);) {
                    b = y_5.result.value;
                    z;
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try { __close(y_5); } finally { if (e_7) throw e_7.error; }
            }
            return [2 /*return*/];
        });
    });
}
function forOfStatement7() {
    return __awaiter(this, void 0, void 0, function () {
        var iterator_3, _a, c, _b, e_8;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, 6, 7]);
                    _a = {};
                    return [4 /*yield*/, y];
                case 1:
                    iterator_3 = (_a.iterator = __values.apply(void 0, [_c.sent()]), _a);
                    _c.label = 2;
                case 2:
                    if (!__step(iterator_3))
                        return [3 /*break*/, 4];
                    c = iterator_3.result.value;
                    z;
                    _c.label = 3;
                case 3: return [3 /*break*/, 2];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _b = _c.sent();
                    e_8 = { error: e_8_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(iterator_3); } finally { if (e_8) throw e_8.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement8() {
    return __awaiter(this, void 0, void 0, function () {
        var y_6, d, _a, e_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    y_6 = { iterator: __values(y) };
                    _b.label = 1;
                case 1:
                    if (!__step(y_6))
                        return [3 /*break*/, 4];
                    d = y_6.result.value;
                    return [4 /*yield*/, z];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _a = _b.sent();
                    e_9 = { error: e_9_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(y_6); } finally { if (e_9) throw e_9.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement9() {
    return __awaiter(this, void 0, void 0, function () {
        var iterator_4, _a, _b, _c, e_10;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _a = {};
                    return [4 /*yield*/, y];
                case 1:
                    iterator_4 = (_a.iterator = __values.apply(void 0, [_d.sent()]), _a);
                    _d.label = 2;
                case 2:
                    if (!__step(iterator_4))
                        return [3 /*break*/, 4];
                    _c = __read(iterator_4.result.value, 1), x = _c[0];
                    z;
                    _d.label = 3;
                case 3: return [3 /*break*/, 2];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _b = _d.sent();
                    e_10 = { error: e_10_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(iterator_4); } finally { if (e_10) throw e_10.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement10() {
    return __awaiter(this, void 0, void 0, function () {
        var y_7, _a, _b, e_11;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, 6, 7]);
                    y_7 = { iterator: __values(y) };
                    _c.label = 1;
                case 1:
                    if (!__step(y_7))
                        return [3 /*break*/, 4];
                    _b = __read(y_7.result.value, 1), x = _b[0];
                    return [4 /*yield*/, z];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _a = _c.sent();
                    e_11 = { error: e_11_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(y_7); } finally { if (e_11) throw e_11.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement11() {
    return __awaiter(this, void 0, void 0, function () {
        var y_8, _a, _b, _c, _d, e_12;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, 8, 9]);
                    y_8 = { iterator: __values(y) };
                    _e.label = 1;
                case 1:
                    if (!__step(y_8))
                        return [3 /*break*/, 6];
                    _c = __read(y_8.result.value, 1), _d = _c[0];
                    if (!(_d === void 0))
                        return [3 /*break*/, 3];
                    return [4 /*yield*/, a];
                case 2:
                    _a = _e.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _d;
                    _e.label = 4;
                case 4:
                    x = _a;
                    z;
                    _e.label = 5;
                case 5: return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 9];
                case 7:
                    _b = _e.sent();
                    e_12 = { error: e_12_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try { __close(y_8); } finally { if (e_12) throw e_12.error; }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement12() {
    return __awaiter(this, void 0, void 0, function () {
        var iterator_5, _a, _b, _c, _d, e_13;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 5, 6, 7]);
                    _a = {};
                    return [4 /*yield*/, y];
                case 1:
                    iterator_5 = (_a.iterator = __values.apply(void 0, [_e.sent()]), _a);
                    _e.label = 2;
                case 2:
                    if (!__step(iterator_5))
                        return [3 /*break*/, 4];
                    _c = __read(iterator_5.result.value, 1), _d = _c[0], x = _d === void 0 ? a : _d;
                    z;
                    _e.label = 3;
                case 3: return [3 /*break*/, 2];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _b = _e.sent();
                    e_13 = { error: e_13_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(iterator_5); } finally { if (e_13) throw e_13.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement13() {
    return __awaiter(this, void 0, void 0, function () {
        var y_9, _a, _b, _c, e_14;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    y_9 = { iterator: __values(y) };
                    _d.label = 1;
                case 1:
                    if (!__step(y_9))
                        return [3 /*break*/, 4];
                    _b = __read(y_9.result.value, 1), _c = _b[0], x = _c === void 0 ? a : _c;
                    return [4 /*yield*/, z];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _a = _d.sent();
                    e_14 = { error: e_14_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(y_9); } finally { if (e_14) throw e_14.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement14() {
    return __awaiter(this, void 0, void 0, function () {
        var iterator_6, _a, _b, e_15;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, 6, 7]);
                    _a = {};
                    return [4 /*yield*/, y];
                case 1:
                    iterator_6 = (_a.iterator = __values.apply(void 0, [_c.sent()]), _a);
                    _c.label = 2;
                case 2:
                    if (!__step(iterator_6))
                        return [3 /*break*/, 4];
                    x = iterator_6.result.value.x;
                    z;
                    _c.label = 3;
                case 3: return [3 /*break*/, 2];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _b = _c.sent();
                    e_15 = { error: e_15_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(iterator_6); } finally { if (e_15) throw e_15.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement15() {
    return __awaiter(this, void 0, void 0, function () {
        var y_10, _a, e_16;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    y_10 = { iterator: __values(y) };
                    _b.label = 1;
                case 1:
                    if (!__step(y_10))
                        return [3 /*break*/, 4];
                    x = y_10.result.value.x;
                    return [4 /*yield*/, z];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _a = _b.sent();
                    e_16 = { error: e_16_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(y_10); } finally { if (e_16) throw e_16.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement16() {
    return __awaiter(this, void 0, void 0, function () {
        var y_11, _a, _b, _c, e_17;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 7, 8, 9]);
                    y_11 = { iterator: __values(y) };
                    _d.label = 1;
                case 1:
                    if (!__step(y_11))
                        return [3 /*break*/, 6];
                    _c = y_11.result.value.x;
                    if (!(_c === void 0))
                        return [3 /*break*/, 3];
                    return [4 /*yield*/, a];
                case 2:
                    _a = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _c;
                    _d.label = 4;
                case 4:
                    x = _a;
                    z;
                    _d.label = 5;
                case 5: return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 9];
                case 7:
                    _b = _d.sent();
                    e_17 = { error: e_17_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try { __close(y_11); } finally { if (e_17) throw e_17.error; }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement17() {
    return __awaiter(this, void 0, void 0, function () {
        var iterator_7, _a, _b, _c, e_18;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _a = {};
                    return [4 /*yield*/, y];
                case 1:
                    iterator_7 = (_a.iterator = __values.apply(void 0, [_d.sent()]), _a);
                    _d.label = 2;
                case 2:
                    if (!__step(iterator_7))
                        return [3 /*break*/, 4];
                    _c = iterator_7.result.value.x, x = _c === void 0 ? a : _c;
                    z;
                    _d.label = 3;
                case 3: return [3 /*break*/, 2];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _b = _d.sent();
                    e_18 = { error: e_18_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(iterator_7); } finally { if (e_18) throw e_18.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function forOfStatement18() {
    return __awaiter(this, void 0, void 0, function () {
        var y_12, _a, _b, e_19;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, 6, 7]);
                    y_12 = { iterator: __values(y) };
                    _c.label = 1;
                case 1:
                    if (!__step(y_12))
                        return [3 /*break*/, 4];
                    _b = y_12.result.value.x, x = _b === void 0 ? a : _b;
                    return [4 /*yield*/, z];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    _a = _c.sent();
                    e_19 = { error: e_19_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try { __close(y_12); } finally { if (e_19) throw e_19.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
