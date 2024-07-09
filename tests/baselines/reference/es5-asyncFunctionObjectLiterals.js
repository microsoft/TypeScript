//// [tests/cases/compiler/es5-asyncFunctionObjectLiterals.ts] ////

//// [es5-asyncFunctionObjectLiterals.ts]
declare var x, y, z, a, b, c;

async function objectLiteral0() {
    x = {
        a: await y,
        b: z
    };
}

async function objectLiteral1() {
    x = {
        a: y,
        b: await z
    };
}

async function objectLiteral2() {
    x = {
        [await a]: y,
        b: z
    };
}

async function objectLiteral3() {
    x = {
        [a]: await y,
        b: z
    };
}

async function objectLiteral4() {
    x = {
        a: await y,
        [b]: z
    };
}

async function objectLiteral5() {
    x = {
        a: y,
        [await b]: z
    };
}

async function objectLiteral6() {
    x = {
        a: y,
        [b]: await z
    };
}

//// [es5-asyncFunctionObjectLiterals.js]
function objectLiteral0() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = {};
                    return [4 /*yield*/, y];
                case 1:
                    x = (_a.a = _b.sent(),
                        _a.b = z,
                        _a);
                    return [2 /*return*/];
            }
        });
    });
}
function objectLiteral1() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = {
                        a: y
                    };
                    return [4 /*yield*/, z];
                case 1:
                    x = (_a.b = _b.sent(),
                        _a);
                    return [2 /*return*/];
            }
        });
    });
}
function objectLiteral2() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = {};
                    return [4 /*yield*/, a];
                case 1:
                    x = (_a[_b.sent()] = y,
                        _a.b = z,
                        _a);
                    return [2 /*return*/];
            }
        });
    });
}
function objectLiteral3() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = {};
                    _a = a;
                    return [4 /*yield*/, y];
                case 1:
                    x = (_b[_a] = _c.sent(),
                        _b.b = z,
                        _b);
                    return [2 /*return*/];
            }
        });
    });
}
function objectLiteral4() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = {};
                    return [4 /*yield*/, y];
                case 1:
                    x = (_a.a = _b.sent(),
                        _a[b] = z,
                        _a);
                    return [2 /*return*/];
            }
        });
    });
}
function objectLiteral5() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = {
                        a: y
                    };
                    return [4 /*yield*/, b];
                case 1:
                    x = (_a[_b.sent()] = z,
                        _a);
                    return [2 /*return*/];
            }
        });
    });
}
function objectLiteral6() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = {
                        a: y
                    };
                    _a = b;
                    return [4 /*yield*/, z];
                case 1:
                    x = (_b[_a] = _c.sent(),
                        _b);
                    return [2 /*return*/];
            }
        });
    });
}
