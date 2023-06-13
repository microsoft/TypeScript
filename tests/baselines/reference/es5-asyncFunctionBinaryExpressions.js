//// [tests/cases/compiler/es5-asyncFunctionBinaryExpressions.ts] ////

//// [es5-asyncFunctionBinaryExpressions.ts]
declare var x, y, z, a, b, c;

async function binaryPlus0() {
    (await x) + y;
}

async function binaryPlus1() {
    x + await y;
}

async function binaryLogicalAnd0() {
    (await x) && y;
}

async function binaryLogicalAnd1() {
    x && await y;
}

async function binaryAssignment0() {
    x = await y;
}

async function binaryAssignment1() {
    x.a = await y;
}

async function binaryAssignment2() {
    x.a.b = await y;
}

async function binaryAssignment3() {
    x[z] = await y;
}

async function binaryAssignment4() {
    x[z].b = await y;
}

async function binaryAssignment5() {
    x.a[z] = await y;
}

async function binaryAssignment6() {
    (await x).a = y;
}

async function binaryAssignment7() {
    (await x.a).b = y;
}

async function binaryAssignment8() {
    (await x)[z] = y;
}

async function binaryAssignment9() {
    x[await z] = y;
}

async function binaryAssignment10() {
    x[await z].b = y;
}

async function binaryAssignment11() {
    (await x[z]).b = y;
}

async function binaryAssignment12() {
    x.a[await z] = y;
}

async function binaryAssignment13() {
    (await x.a)[z] = y;
}

async function binaryCompoundAssignment0() {
    x += await y;
}

async function binaryCompoundAssignment1() {
    x.a += await y;
}

async function binaryCompoundAssignment2() {
    x[a] += await y;
}

async function binaryCompoundAssignment3() {
    (await x).a += y;
}

async function binaryCompoundAssignment4() {
    (await x)[a] += y;
}

async function binaryCompoundAssignment5() {
    x[await a] += y;
}

async function binaryCompoundAssignment6() {
    (await x).a += await y;
}

async function binaryCompoundAssignment7() {
    (await x)[a] += await y;
}

async function binaryCompoundAssignment8() {
    x[await a] += await y;
}

async function binaryExponentiation() {
    (await x) ** y;
    x ** await y;
}

async function binaryComma0() {
    return (await x), y;
}

async function binaryComma1(): Promise<any> {
    return x, await y;
}

//// [es5-asyncFunctionBinaryExpressions.js]
function binaryPlus0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_a.sent()) + y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryPlus1() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, y];
                case 1:
                    _a + (_b.sent());
                    return [2 /*return*/];
            }
        });
    });
}
function binaryLogicalAnd0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_a.sent()) && y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryLogicalAnd1() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, y];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    _a;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    x = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment1() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, y];
                case 1:
                    _a.a = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment2() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x.a;
                    return [4 /*yield*/, y];
                case 1:
                    _a.b = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment3() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = x;
                    _b = z;
                    return [4 /*yield*/, y];
                case 1:
                    _a[_b] = _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment4() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x[z];
                    return [4 /*yield*/, y];
                case 1:
                    _a.b = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment5() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = x.a;
                    _b = z;
                    return [4 /*yield*/, y];
                case 1:
                    _a[_b] = _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment6() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_a.sent()).a = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment7() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x.a];
                case 1:
                    (_a.sent()).b = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment8() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_a.sent())[z] = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment9() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, z];
                case 1:
                    _a[_b.sent()] = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment10() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, z];
                case 1:
                    _a[_b.sent()].b = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment11() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x[z]];
                case 1:
                    (_a.sent()).b = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment12() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x.a;
                    return [4 /*yield*/, z];
                case 1:
                    _a[_b.sent()] = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment13() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x.a];
                case 1:
                    (_a.sent())[z] = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment0() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, y];
                case 1:
                    x = _a + _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment1() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = x;
                    _b = _a.a;
                    return [4 /*yield*/, y];
                case 1:
                    _a.a = _b + _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment2() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = x;
                    _b = a;
                    _c = _a[_b];
                    return [4 /*yield*/, y];
                case 1:
                    _a[_b] = _c + _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment3() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_a.sent()).a += y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_a.sent())[a] += y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment5() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, a];
                case 1:
                    _a[_b.sent()] += y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment6() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _a = (_c.sent());
                    _b = _a.a;
                    return [4 /*yield*/, y];
                case 2:
                    _a.a = _b + _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment7() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _a = (_d.sent());
                    _b = a;
                    _c = _a[_b];
                    return [4 /*yield*/, y];
                case 2:
                    _a[_b] = _c + _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment8() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, a];
                case 1:
                    _b = _d.sent();
                    _c = _a[_b];
                    return [4 /*yield*/, y];
                case 2:
                    _a[_b] = _c + _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryExponentiation() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _b = (_a = Math).pow;
                    return [4 /*yield*/, x];
                case 1:
                    _b.apply(_a, [(_f.sent()), y]);
                    _d = (_c = Math).pow;
                    _e = [x];
                    return [4 /*yield*/, y];
                case 2:
                    _d.apply(_c, _e.concat([_f.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
function binaryComma0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1: return [2 /*return*/, ((_a.sent()), y)];
            }
        });
    });
}
function binaryComma1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    x;
                    return [4 /*yield*/, y];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
