//// [tests/cases/compiler/es5-asyncFunctionNewExpressions.ts] ////

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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    new (_a.sent())(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression2() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x.bind;
                    return [4 /*yield*/, y];
                case 1:
                    new (_a.apply(x, [void 0, _b.sent(), z]))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression3() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = x.bind;
                    _b = [void 0, y];
                    return [4 /*yield*/, z];
                case 1:
                    new (_a.apply(x, _b.concat([_c.sent()])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new (x.bind.apply(x, __spreadArray(__spreadArray([void 0], y, false), [z], false)))()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression5() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    new ((_a = (_b.sent())).bind.apply(_a, __spreadArray(__spreadArray([void 0], y, false), [z], false)))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression6() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = x.bind).apply;
                    _c = [x];
                    _d = [[void 0]];
                    return [4 /*yield*/, y];
                case 1:
                    new (_b.apply(_a, _c.concat([__spreadArray.apply(void 0, [__spreadArray.apply(void 0, _d.concat([(_e.sent()), false])), [z], false])])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression7() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = x.bind).apply;
                    _c = [x];
                    _d = [__spreadArray([void 0], y, false)];
                    return [4 /*yield*/, z];
                case 1:
                    new (_b.apply(_a, _c.concat([__spreadArray.apply(void 0, _d.concat([[_e.sent()], false]))])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression8() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = x.bind).apply;
                    _c = [x];
                    _d = [void 0];
                    return [4 /*yield*/, y];
                case 1:
                    new (_b.apply(_a, _c.concat([__spreadArray.apply(void 0, [_d.concat([_e.sent()]), z, false])])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression9() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = x.bind).apply;
                    _c = [x];
                    _d = [[void 0, y]];
                    return [4 /*yield*/, z];
                case 1:
                    new (_b.apply(_a, _c.concat([__spreadArray.apply(void 0, _d.concat([(_e.sent()), false]))])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression10() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new x.a(y, z)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression11() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x.a];
                case 1:
                    new (_a.sent())(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression12() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    new (_a.sent()).a(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression13() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = x.a).bind;
                    return [4 /*yield*/, y];
                case 1:
                    new (_b.apply(_a, [void 0, _c.sent(), z]))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression14() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = x.a).bind;
                    _c = [void 0, y];
                    return [4 /*yield*/, z];
                case 1:
                    new (_b.apply(_a, _c.concat([_d.sent()])))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression15() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new x[a](y, z)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression16() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x[a]];
                case 1:
                    new (_a.sent())(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression17() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    new (_a.sent())[a](y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression18() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, a];
                case 1:
                    new _a[_b.sent()](y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression19() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = x[a]).bind;
                    return [4 /*yield*/, y];
                case 1:
                    new (_b.apply(_a, [void 0, _c.sent(), z]))();
                    return [2 /*return*/];
            }
        });
    });
}
function newExpression20() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = x[a]).bind;
                    _c = [void 0, y];
                    return [4 /*yield*/, z];
                case 1:
                    new (_b.apply(_a, _c.concat([_d.sent()])))();
                    return [2 /*return*/];
            }
        });
    });
}
