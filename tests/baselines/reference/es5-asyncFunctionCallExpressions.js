//// [es5-asyncFunctionCallExpressions.ts]
declare var x, y, z, a, b, c;

async function callExpression0() {
    await x(y, z);
}

async function callExpression1() {
    (await x)(y, z);
}

async function callExpression2() {
    x(await y, z);
}

async function callExpression3() {
    x(y, await z);
}

async function callExpression4() {
    await x(...y, z);
}

async function callExpression5() {
    (await x)(...y, z);
}

async function callExpression6() {
    x(...(await y), z);
}

async function callExpression7() {
    x(...y, await z);
}

async function callExpression8() {
    x(await y, ...z);
}

async function callExpression9() {
    x(y, ...(await z));
}

async function callExpression10() {
    await x.a(y, z);
}

async function callExpression11() {
    (await x.a)(y, z);
}

async function callExpression12() {
    (await x).a(y, z);
}

async function callExpression13() {
    x.a(await y, z);
}

async function callExpression14() {
    x.a(y, await z);
}

async function callExpression15() {
    await x[a](y, z);
}

async function callExpression16() {
    (await x[a])(y, z);
}

async function callExpression17() {
    (await x)[a](y, z);
}

async function callExpression18() {
    x[await a](y, z);
}

async function callExpression19() {
    x[a](await y, z);
}

async function callExpression20() {
    x[a](y, await z);
}


//// [es5-asyncFunctionCallExpressions.js]
function callExpression0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x(y, z)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_b.sent())(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression2() {
    return __awaiter(this, void 0, void 0, function () {
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = x;
                    return [4 /*yield*/, y];
                case 1:
                    _c.apply(void 0, [_d.sent(), z]);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression3() {
    return __awaiter(this, void 0, void 0, function () {
        var _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _e = x;
                    _f = [y];
                    return [4 /*yield*/, z];
                case 1:
                    _e.apply(void 0, _f.concat([_g.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, x.apply(void 0, __spreadArrays(y, [z]))];
                case 1:
                    _h.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression5() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_j.sent()).apply(void 0, __spreadArrays(y, [z]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression6() {
    return __awaiter(this, void 0, void 0, function () {
        var _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    _l = (_k = x).apply;
                    _m = [void 0];
                    return [4 /*yield*/, y];
                case 1:
                    _l.apply(_k, _m.concat([__spreadArrays.apply(void 0, [(_o.sent()), [z]])]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression7() {
    return __awaiter(this, void 0, void 0, function () {
        var _p, _q, _r, _s;
        return __generator(this, function (_t) {
            switch (_t.label) {
                case 0:
                    _q = (_p = x).apply;
                    _r = [void 0];
                    _s = [y];
                    return [4 /*yield*/, z];
                case 1:
                    _q.apply(_p, _r.concat([__spreadArrays.apply(void 0, _s.concat([[_t.sent()]]))]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression8() {
    return __awaiter(this, void 0, void 0, function () {
        var _u, _v, _w;
        return __generator(this, function (_x) {
            switch (_x.label) {
                case 0:
                    _v = (_u = x).apply;
                    _w = [void 0];
                    return [4 /*yield*/, y];
                case 1:
                    _v.apply(_u, _w.concat([__spreadArrays.apply(void 0, [[_x.sent()], z])]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression9() {
    return __awaiter(this, void 0, void 0, function () {
        var _y, _z, _0, _1;
        return __generator(this, function (_2) {
            switch (_2.label) {
                case 0:
                    _z = (_y = x).apply;
                    _0 = [void 0];
                    _1 = [[y]];
                    return [4 /*yield*/, z];
                case 1:
                    _z.apply(_y, _0.concat([__spreadArrays.apply(void 0, _1.concat([(_2.sent())]))]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression10() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_3) {
            switch (_3.label) {
                case 0: return [4 /*yield*/, x.a(y, z)];
                case 1:
                    _3.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression11() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_4) {
            switch (_4.label) {
                case 0: return [4 /*yield*/, x.a];
                case 1:
                    (_4.sent())(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression12() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_5) {
            switch (_5.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_5.sent()).a(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression13() {
    return __awaiter(this, void 0, void 0, function () {
        var _6, _7;
        return __generator(this, function (_8) {
            switch (_8.label) {
                case 0:
                    _7 = (_6 = x).a;
                    return [4 /*yield*/, y];
                case 1:
                    _7.apply(_6, [_8.sent(), z]);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression14() {
    return __awaiter(this, void 0, void 0, function () {
        var _9, _10, _11;
        return __generator(this, function (_12) {
            switch (_12.label) {
                case 0:
                    _10 = (_9 = x).a;
                    _11 = [y];
                    return [4 /*yield*/, z];
                case 1:
                    _10.apply(_9, _11.concat([_12.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression15() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_13) {
            switch (_13.label) {
                case 0: return [4 /*yield*/, x[a](y, z)];
                case 1:
                    _13.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression16() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_14) {
            switch (_14.label) {
                case 0: return [4 /*yield*/, x[a]];
                case 1:
                    (_14.sent())(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression17() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_15) {
            switch (_15.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_15.sent())[a](y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression18() {
    return __awaiter(this, void 0, void 0, function () {
        var _16;
        return __generator(this, function (_17) {
            switch (_17.label) {
                case 0:
                    _16 = x;
                    return [4 /*yield*/, a];
                case 1:
                    _16[_17.sent()](y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression19() {
    return __awaiter(this, void 0, void 0, function () {
        var _18, _19;
        return __generator(this, function (_20) {
            switch (_20.label) {
                case 0:
                    _19 = (_18 = x)[a];
                    return [4 /*yield*/, y];
                case 1:
                    _19.apply(_18, [_20.sent(), z]);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression20() {
    return __awaiter(this, void 0, void 0, function () {
        var _21, _22, _23;
        return __generator(this, function (_24) {
            switch (_24.label) {
                case 0:
                    _22 = (_21 = x)[a];
                    _23 = [y];
                    return [4 /*yield*/, z];
                case 1:
                    _22.apply(_21, _23.concat([_24.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
