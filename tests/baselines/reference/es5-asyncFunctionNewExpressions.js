//// [es5-asyncFunctionNewExpressions.ts]
declare var x, y, z, a, b, c;

async function newExpression0() {
    await new x(y, z);
}

async function newExpression1() {
    new (await x)(y, z);
}

async function newExpression2() {
    new x(await y, z);
}

async function newExpression3() {
    new x(y, await z);
}

async function newExpression4() {
    await new x(...y, z);
}

async function newExpression5() {
    new (await x)(...y, z);
}

async function newExpression6() {
    new x(...(await y), z);
}

async function newExpression7() {
    new x(...y, await z);
}

async function newExpression8() {
    new x(await y, ...z);
}

async function newExpression9() {
    new x(y, ...(await z));
}

async function newExpression10() {
    await new x.a(y, z);
}

async function newExpression11() {
    new (await x.a)(y, z);
}

async function newExpression12() {
    new (await x).a(y, z);
}

async function newExpression13() {
    new x.a(await y, z);
}

async function newExpression14() {
    new x.a(y, await z);
}

async function newExpression15() {
    await new x[a](y, z);
}

async function newExpression16() {
    new (await x[a])(y, z);
}

async function newExpression17() {
    new (await x)[a](y, z);
}

async function newExpression18() {
    new x[await a](y, z);
}

async function newExpression19() {
    new x[a](await y, z);
}

async function newExpression20() {
    new x[a](y, await z);
}

//// [es5-asyncFunctionNewExpressions.js]
function newExpression0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new x(y, z)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    new (_b.sent())(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression2() {
    return __awaiter(this, void 0, void 0, function () {
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = x.bind;
                    return [4 /*yield*/, y];
                case 1:
                    new (_c.apply(x, [void 0, _d.sent(), z]))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression3() {
    return __awaiter(this, void 0, void 0, function () {
        var _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _e = x.bind;
                    _f = [void 0, y];
                    return [4 /*yield*/, z];
                case 1:
                    new (_e.apply(x, _f.concat([_g.sent()])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, new (x.bind.apply(x, __spreadArrays([void 0], y, [z])))()];
                case 1:
                    _h.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression5() {
    return __awaiter(this, void 0, void 0, function () {
        var _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    new ((_j = (_k.sent())).bind.apply(_j, __spreadArrays([void 0], y, [z])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression6() {
    return __awaiter(this, void 0, void 0, function () {
        var _l, _m, _o, _p;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    _m = (_l = x.bind).apply;
                    _o = [x];
                    _p = [[void 0]];
                    return [4 /*yield*/, y];
                case 1:
                    new (_m.apply(_l, _o.concat([__spreadArrays.apply(void 0, _p.concat([(_q.sent()), [z]]))])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression7() {
    return __awaiter(this, void 0, void 0, function () {
        var _r, _s, _t, _u;
        return __generator(this, function (_v) {
            switch (_v.label) {
                case 0:
                    _s = (_r = x.bind).apply;
                    _t = [x];
                    _u = [[void 0], y];
                    return [4 /*yield*/, z];
                case 1:
                    new (_s.apply(_r, _t.concat([__spreadArrays.apply(void 0, _u.concat([[_v.sent()]]))])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression8() {
    return __awaiter(this, void 0, void 0, function () {
        var _w, _x, _y, _z;
        return __generator(this, function (_0) {
            switch (_0.label) {
                case 0:
                    _x = (_w = x.bind).apply;
                    _y = [x];
                    _z = [void 0];
                    return [4 /*yield*/, y];
                case 1:
                    new (_x.apply(_w, _y.concat([__spreadArrays.apply(void 0, [_z.concat([_0.sent()]), z])])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression9() {
    return __awaiter(this, void 0, void 0, function () {
        var _1, _2, _3, _4;
        return __generator(this, function (_5) {
            switch (_5.label) {
                case 0:
                    _2 = (_1 = x.bind).apply;
                    _3 = [x];
                    _4 = [[void 0, y]];
                    return [4 /*yield*/, z];
                case 1:
                    new (_2.apply(_1, _3.concat([__spreadArrays.apply(void 0, _4.concat([(_5.sent())]))])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression10() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_6) {
            switch (_6.label) {
                case 0: return [4 /*yield*/, new x.a(y, z)];
                case 1:
                    _6.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression11() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_7) {
            switch (_7.label) {
                case 0: return [4 /*yield*/, x.a];
                case 1:
                    new (_7.sent())(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression12() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_8) {
            switch (_8.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    new (_8.sent()).a(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression13() {
    return __awaiter(this, void 0, void 0, function () {
        var _9, _10;
        return __generator(this, function (_11) {
            switch (_11.label) {
                case 0:
                    _10 = (_9 = x.a).bind;
                    return [4 /*yield*/, y];
                case 1:
                    new (_10.apply(_9, [void 0, _11.sent(), z]))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression14() {
    return __awaiter(this, void 0, void 0, function () {
        var _12, _13, _14;
        return __generator(this, function (_15) {
            switch (_15.label) {
                case 0:
                    _13 = (_12 = x.a).bind;
                    _14 = [void 0, y];
                    return [4 /*yield*/, z];
                case 1:
                    new (_13.apply(_12, _14.concat([_15.sent()])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression15() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_16) {
            switch (_16.label) {
                case 0: return [4 /*yield*/, new x[a](y, z)];
                case 1:
                    _16.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression16() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_17) {
            switch (_17.label) {
                case 0: return [4 /*yield*/, x[a]];
                case 1:
                    new (_17.sent())(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression17() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_18) {
            switch (_18.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    new (_18.sent())[a](y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression18() {
    return __awaiter(this, void 0, void 0, function () {
        var _19;
        return __generator(this, function (_20) {
            switch (_20.label) {
                case 0:
                    _19 = x;
                    return [4 /*yield*/, a];
                case 1:
                    new _19[_20.sent()](y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression19() {
    return __awaiter(this, void 0, void 0, function () {
        var _21, _22;
        return __generator(this, function (_23) {
            switch (_23.label) {
                case 0:
                    _22 = (_21 = x[a]).bind;
                    return [4 /*yield*/, y];
                case 1:
                    new (_22.apply(_21, [void 0, _23.sent(), z]))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression20() {
    return __awaiter(this, void 0, void 0, function () {
        var _24, _25, _26;
        return __generator(this, function (_27) {
            switch (_27.label) {
                case 0:
                    _25 = (_24 = x[a]).bind;
                    _26 = [void 0, y];
                    return [4 /*yield*/, z];
                case 1:
                    new (_25.apply(_24, _26.concat([_27.sent()])))();
                    return [2 /*return*/];
            }
        });
    });
}
