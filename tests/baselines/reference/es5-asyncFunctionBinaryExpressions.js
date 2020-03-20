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
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = x;
                    return [4 /*yield*/, y];
                case 1:
                    _b + (_c.sent());
                    return [2 /*return*/];
            }
        });
    });
}
function binaryLogicalAnd0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_d.sent()) && y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryLogicalAnd1() {
    return __awaiter(this, void 0, void 0, function () {
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _e = x;
                    if (!_e) return [3 /*break*/, 2];
                    return [4 /*yield*/, y];
                case 1:
                    _e = (_f.sent());
                    _f.label = 2;
                case 2:
                    _e;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    x = _g.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment1() {
    return __awaiter(this, void 0, void 0, function () {
        var _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _h = x;
                    return [4 /*yield*/, y];
                case 1:
                    _h.a = _j.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment2() {
    return __awaiter(this, void 0, void 0, function () {
        var _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    _k = x.a;
                    return [4 /*yield*/, y];
                case 1:
                    _k.b = _l.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment3() {
    return __awaiter(this, void 0, void 0, function () {
        var _m, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    _m = x;
                    _o = z;
                    return [4 /*yield*/, y];
                case 1:
                    _m[_o] = _p.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment4() {
    return __awaiter(this, void 0, void 0, function () {
        var _q;
        return __generator(this, function (_r) {
            switch (_r.label) {
                case 0:
                    _q = x[z];
                    return [4 /*yield*/, y];
                case 1:
                    _q.b = _r.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment5() {
    return __awaiter(this, void 0, void 0, function () {
        var _s, _t;
        return __generator(this, function (_u) {
            switch (_u.label) {
                case 0:
                    _s = x.a;
                    _t = z;
                    return [4 /*yield*/, y];
                case 1:
                    _s[_t] = _u.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment6() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_v) {
            switch (_v.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_v.sent()).a = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment7() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_w) {
            switch (_w.label) {
                case 0: return [4 /*yield*/, x.a];
                case 1:
                    (_w.sent()).b = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment8() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_x) {
            switch (_x.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_x.sent())[z] = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment9() {
    return __awaiter(this, void 0, void 0, function () {
        var _y;
        return __generator(this, function (_z) {
            switch (_z.label) {
                case 0:
                    _y = x;
                    return [4 /*yield*/, z];
                case 1:
                    _y[_z.sent()] = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment10() {
    return __awaiter(this, void 0, void 0, function () {
        var _0;
        return __generator(this, function (_1) {
            switch (_1.label) {
                case 0:
                    _0 = x;
                    return [4 /*yield*/, z];
                case 1:
                    _0[_1.sent()].b = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment11() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_2) {
            switch (_2.label) {
                case 0: return [4 /*yield*/, x[z]];
                case 1:
                    (_2.sent()).b = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment12() {
    return __awaiter(this, void 0, void 0, function () {
        var _3;
        return __generator(this, function (_4) {
            switch (_4.label) {
                case 0:
                    _3 = x.a;
                    return [4 /*yield*/, z];
                case 1:
                    _3[_4.sent()] = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryAssignment13() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_5) {
            switch (_5.label) {
                case 0: return [4 /*yield*/, x.a];
                case 1:
                    (_5.sent())[z] = y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment0() {
    return __awaiter(this, void 0, void 0, function () {
        var _6;
        return __generator(this, function (_7) {
            switch (_7.label) {
                case 0:
                    _6 = x;
                    return [4 /*yield*/, y];
                case 1:
                    x = _6 + _7.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment1() {
    return __awaiter(this, void 0, void 0, function () {
        var _8, _9;
        return __generator(this, function (_10) {
            switch (_10.label) {
                case 0:
                    _8 = x;
                    _9 = _8.a;
                    return [4 /*yield*/, y];
                case 1:
                    _8.a = _9 + _10.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment2() {
    return __awaiter(this, void 0, void 0, function () {
        var _11, _12, _13;
        return __generator(this, function (_14) {
            switch (_14.label) {
                case 0:
                    _11 = x;
                    _12 = a;
                    _13 = _11[_12];
                    return [4 /*yield*/, y];
                case 1:
                    _11[_12] = _13 + _14.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment3() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_15) {
            switch (_15.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_15.sent()).a += y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_16) {
            switch (_16.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_16.sent())[a] += y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment5() {
    return __awaiter(this, void 0, void 0, function () {
        var _17;
        return __generator(this, function (_18) {
            switch (_18.label) {
                case 0:
                    _17 = x;
                    return [4 /*yield*/, a];
                case 1:
                    _17[_18.sent()] += y;
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment6() {
    return __awaiter(this, void 0, void 0, function () {
        var _19, _20;
        return __generator(this, function (_21) {
            switch (_21.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _19 = (_21.sent());
                    _20 = _19.a;
                    return [4 /*yield*/, y];
                case 2:
                    _19.a = _20 + _21.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment7() {
    return __awaiter(this, void 0, void 0, function () {
        var _22, _23, _24;
        return __generator(this, function (_25) {
            switch (_25.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _22 = (_25.sent());
                    _23 = a;
                    _24 = _22[_23];
                    return [4 /*yield*/, y];
                case 2:
                    _22[_23] = _24 + _25.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryCompoundAssignment8() {
    return __awaiter(this, void 0, void 0, function () {
        var _26, _27, _28;
        return __generator(this, function (_29) {
            switch (_29.label) {
                case 0:
                    _26 = x;
                    return [4 /*yield*/, a];
                case 1:
                    _27 = _29.sent();
                    _28 = _26[_27];
                    return [4 /*yield*/, y];
                case 2:
                    _26[_27] = _28 + _29.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function binaryExponentiation() {
    return __awaiter(this, void 0, void 0, function () {
        var _30, _31, _32, _33, _34;
        return __generator(this, function (_35) {
            switch (_35.label) {
                case 0:
                    _31 = (_30 = Math).pow;
                    return [4 /*yield*/, x];
                case 1:
                    _31.apply(_30, [(_35.sent()), y]);
                    _33 = (_32 = Math).pow;
                    _34 = [x];
                    return [4 /*yield*/, y];
                case 2:
                    _33.apply(_32, _34.concat([_35.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
function binaryComma0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_36) {
            switch (_36.label) {
                case 0: return [4 /*yield*/, x];
                case 1: return [2 /*return*/, ((_36.sent()), y)];
            }
        });
    });
}
function binaryComma1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_37) {
            switch (_37.label) {
                case 0:
                    x;
                    return [4 /*yield*/, y];
                case 1: return [2 /*return*/, _37.sent()];
            }
        });
    });
}
