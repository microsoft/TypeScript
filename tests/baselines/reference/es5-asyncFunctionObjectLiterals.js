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
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = {
                        a: y
                    };
                    return [4 /*yield*/, z];
                case 1:
                    x = (_c.b = _d.sent(),
                        _c);
                    return [2 /*return*/];
            }
        });
    });
}
function objectLiteral2() {
    return __awaiter(this, void 0, void 0, function () {
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _e = {};
                    return [4 /*yield*/, a];
                case 1:
                    x = (_e[_f.sent()] = y,
                        _e.b = z,
                        _e);
                    return [2 /*return*/];
            }
        });
    });
}
function objectLiteral3() {
    return __awaiter(this, void 0, void 0, function () {
        var _g;
        var _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _h = {};
                    _g = a;
                    return [4 /*yield*/, y];
                case 1:
                    x = (_h[_g] = _j.sent(),
                        _h.b = z,
                        _h);
                    return [2 /*return*/];
            }
        });
    });
}
function objectLiteral4() {
    return __awaiter(this, void 0, void 0, function () {
        var _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    _k = {};
                    return [4 /*yield*/, y];
                case 1:
                    x = (_k.a = _l.sent(),
                        _k[b] = z,
                        _k);
                    return [2 /*return*/];
            }
        });
    });
}
function objectLiteral5() {
    return __awaiter(this, void 0, void 0, function () {
        var _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    _m = {
                            a: y
                        };
                    return [4 /*yield*/, b];
                case 1:
                    x = (_m[_o.sent()] = z,
                        _m);
                    return [2 /*return*/];
            }
        });
    });
}
function objectLiteral6() {
    return __awaiter(this, void 0, void 0, function () {
        var _p;
        var _q;
        return __generator(this, function (_r) {
            switch (_r.label) {
                case 0:
                    _q = {
                            a: y
                        };
                    _p = b;
                    return [4 /*yield*/, z];
                case 1:
                    x = (_q[_p] = _r.sent(),
                        _q);
                    return [2 /*return*/];
            }
        });
    });
}
