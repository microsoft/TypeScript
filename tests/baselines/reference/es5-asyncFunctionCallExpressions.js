//// [tests/cases/compiler/es5-asyncFunctionCallExpressions.ts] ////

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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_a.sent())(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression2() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, y];
                case 1:
                    _a.apply(void 0, [_b.sent(), z]);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression3() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = x;
                    _b = [y];
                    return [4 /*yield*/, z];
                case 1:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x.apply(void 0, __spreadArray(__spreadArray([], y, false), [z], false))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression5() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_a.sent()).apply(void 0, __spreadArray(__spreadArray([], y, false), [z], false));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression6() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = x).apply;
                    _c = [void 0];
                    _d = [[]];
                    return [4 /*yield*/, y];
                case 1:
                    _b.apply(_a, _c.concat([__spreadArray.apply(void 0, [__spreadArray.apply(void 0, _d.concat([(_e.sent()), false])), [z], false])]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression7() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = x).apply;
                    _c = [void 0];
                    _d = [__spreadArray([], y, false)];
                    return [4 /*yield*/, z];
                case 1:
                    _b.apply(_a, _c.concat([__spreadArray.apply(void 0, _d.concat([[_e.sent()], false]))]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression8() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = x).apply;
                    _c = [void 0];
                    return [4 /*yield*/, y];
                case 1:
                    _b.apply(_a, _c.concat([__spreadArray.apply(void 0, [[_d.sent()], z, false])]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression9() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = x).apply;
                    _c = [void 0];
                    _d = [[y]];
                    return [4 /*yield*/, z];
                case 1:
                    _b.apply(_a, _c.concat([__spreadArray.apply(void 0, _d.concat([(_e.sent()), false]))]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression10() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x.a(y, z)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression11() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x.a];
                case 1:
                    (_a.sent())(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression12() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_a.sent()).a(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression13() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = x).a;
                    return [4 /*yield*/, y];
                case 1:
                    _b.apply(_a, [_c.sent(), z]);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression14() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = x).a;
                    _c = [y];
                    return [4 /*yield*/, z];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression15() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x[a](y, z)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression16() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x[a]];
                case 1:
                    (_a.sent())(y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression17() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    (_a.sent())[a](y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression18() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, a];
                case 1:
                    _a[_b.sent()](y, z);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression19() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = x)[a];
                    return [4 /*yield*/, y];
                case 1:
                    _b.apply(_a, [_c.sent(), z]);
                    return [2 /*return*/];
            }
        });
    });
}
function callExpression20() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = x)[a];
                    _c = [y];
                    return [4 /*yield*/, z];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2 /*return*/];
            }
        });
    });
}
