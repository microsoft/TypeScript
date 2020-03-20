//// [es5-asyncFunctionWithStatements.ts]
declare var x, y, z, a, b, c;

async function withStatement0() {
    with (x) {
        y;
    }
}

async function withStatement1() {
    with (await x) {
        y;
    }
}

async function withStatement2() {
    with (x) {
        a;
        await y;
        b;
    }
}

async function withStatement3() {
    with (x) {
        with (z) {
            a;
            await y;
            b;
        }
    }
}

//// [es5-asyncFunctionWithStatements.js]
function withStatement0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            with (x) {
                y;
            }
            return [2 /*return*/];
        });
    });
}
function withStatement1() {
    return __awaiter(this, void 0, void 0, function () {
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _b = _c.sent();
                    _c.label = 2;
                case 2:
                    with (_b) {
                        y;
                    }
                    _c.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function withStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _d = x;
                    _e.label = 1;
                case 1: with (_d) {
                    a;
                    return [4 /*yield*/, y];
                }
                case 2:
                    with (_d) {
                        _e.sent();
                        b;
                    }
                    _e.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function withStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        var _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _f = x;
                    _h.label = 1;
                case 1:
                    with (_f) {
                        _g = z;
                    }
                    _h.label = 2;
                case 2: with (_f) {
                    with (_g) {
                        a;
                        return [4 /*yield*/, y];
                    }
                }
                case 3:
                    with (_f) {
                        with (_g) {
                            _h.sent();
                            b;
                        }
                    }
                    _h.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
