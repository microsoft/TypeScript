//// [es5-asyncFunctionArrayLiterals.ts]
declare var x, y, z, a;

async function arrayLiteral0() {
    x = [await y, z];
}

async function arrayLiteral1() {
    x = [y, await z];
}

async function arrayLiteral2() {
    x = [...(await y), z];
}

async function arrayLiteral3() {
    x = [...y, await z];
}

async function arrayLiteral4() {
    x = [await y, ...z];
}

async function arrayLiteral5() {
    x = [y, ...(await z)];
}

async function arrayLiteral6() {
    x = [y, await z, a];
}

async function arrayLiteral7() {
    x = [await y, z, await a];
}

//// [es5-asyncFunctionArrayLiterals.js]
function arrayLiteral0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    x = [_a.sent(), z];
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral1() {
    return __awaiter(this, void 0, void 0, function () {
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = [y];
                    return [4 /*yield*/, z];
                case 1:
                    x = _b.concat([_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    x = __spreadArrays.apply(void 0, [(_d.sent()), [z]]);
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral3() {
    return __awaiter(this, void 0, void 0, function () {
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _e = [y];
                    return [4 /*yield*/, z];
                case 1:
                    x = __spreadArrays.apply(void 0, _e.concat([[_f.sent()]]));
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral4() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    x = __spreadArrays.apply(void 0, [[_g.sent()], z]);
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral5() {
    return __awaiter(this, void 0, void 0, function () {
        var _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _h = [[y]];
                    return [4 /*yield*/, z];
                case 1:
                    x = __spreadArrays.apply(void 0, _h.concat([(_j.sent())]));
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral6() {
    return __awaiter(this, void 0, void 0, function () {
        var _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    _k = [y];
                    return [4 /*yield*/, z];
                case 1:
                    x = _k.concat([_l.sent(), a]);
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral7() {
    return __awaiter(this, void 0, void 0, function () {
        var _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    _m = [_o.sent(), z];
                    return [4 /*yield*/, a];
                case 2:
                    x = _m.concat([_o.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
