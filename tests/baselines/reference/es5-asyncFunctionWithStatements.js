//// [tests/cases/compiler/es5-asyncFunctionWithStatements.ts] ////

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
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    _a = _b.sent();
                    _b.label = 2;
                case 2:
                    with (_a) {
                        y;
                    }
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function withStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    _b.label = 1;
                case 1: with (_a) {
                    a;
                    return [4 /*yield*/, y];
                }
                case 2:
                    with (_a) {
                        _b.sent();
                        b;
                    }
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function withStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = x;
                    _c.label = 1;
                case 1:
                    with (_a) {
                        _b = z;
                    }
                    _c.label = 2;
                case 2: with (_a) {
                    with (_b) {
                        a;
                        return [4 /*yield*/, y];
                    }
                }
                case 3:
                    with (_a) {
                        with (_b) {
                            _c.sent();
                            b;
                        }
                    }
                    _c.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
