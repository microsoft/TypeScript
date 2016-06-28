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
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    x = [_b.sent(), z];
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral1() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = [y];
                    return [4 /*yield*/, z];
                case 1:
                    x = _a.concat([_b.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral2() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    x = (_a.sent()).concat([z]);
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral3() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = y).concat;
                    return [4 /*yield*/, z];
                case 1:
                    x = _b.apply(_a, [[_e.sent()]]);
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral4() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    x = [_b.sent()].concat(z);
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral5() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = [y]).concat;
                    return [4 /*yield*/, z];
                case 1:
                    x = _b.apply(_a, [(_d.sent())]);
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral6() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = [y];
                    return [4 /*yield*/, z];
                case 1:
                    x = _a.concat([_b.sent(), a]);
                    return [2 /*return*/];
            }
        });
    });
}
function arrayLiteral7() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    _a = [_b.sent(), z];
                    return [4 /*yield*/, a];
                case 2:
                    x = _a.concat([_b.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
