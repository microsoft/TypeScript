//// [tests/cases/compiler/es5-yieldFunctionObjectLiterals.ts] ////

//// [es5-yieldFunctionObjectLiterals.ts]
// mainly to verify indentation of emitted code

function g() { return "g"; }

function* objectLiteral1() {
    const x = {
        a: 1,
        b: yield 2,
        c: 3,
    }
}

function* objectLiteral2() {
    const x = {
        a: 1,
        [g()]: yield 2,
        c: 3,
    }
}

function* objectLiteral3() {
    const x = {
        a: 1,
        b: yield 2,
        [g()]: 3,
        c: 4,
    }
}

function* objectLiteral4() {
    const x = {
        a: 1,
        [g()]: 2,
        b: yield 3,
        c: 4,
    }
}

function* objectLiteral5() {
    const x = {
        a: 1,
        [g()]: yield 2,
        c: 4,
    }
}

function* objectLiteral6() {
    const x = {
        a: 1,
        [yield]: 2,
        c: 4,
    }
}

function* objectLiteral7() {
    const x = {
        a: 1,
        [yield]: yield 2,
        c: 4,
    }
}


//// [es5-yieldFunctionObjectLiterals.js]
// mainly to verify indentation of emitted code
function g() { return "g"; }
function objectLiteral1() {
    var x, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {
                    a: 1
                };
                return [4 /*yield*/, 2];
            case 1:
                x = (_a.b = _b.sent(),
                    _a.c = 3,
                    _a);
                return [2 /*return*/];
        }
    });
}
function objectLiteral2() {
    var x, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = {
                        a: 1
                    };
                _a = g();
                return [4 /*yield*/, 2];
            case 1:
                x = (_b[_a] = _c.sent(),
                    _b.c = 3,
                    _b);
                return [2 /*return*/];
        }
    });
}
function objectLiteral3() {
    var x, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = {
                    a: 1
                };
                return [4 /*yield*/, 2];
            case 1:
                x = (_b = (_a.b = _c.sent(),
                    _a),
                    _b[g()] = 3,
                    _b.c = 4,
                    _b);
                return [2 /*return*/];
        }
    });
}
function objectLiteral4() {
    var x;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {
                        a: 1
                    },
                    _a[g()] = 2;
                return [4 /*yield*/, 3];
            case 1:
                x = (_a.b = _b.sent(),
                    _a.c = 4,
                    _a);
                return [2 /*return*/];
        }
    });
}
function objectLiteral5() {
    var x, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = {
                        a: 1
                    };
                _a = g();
                return [4 /*yield*/, 2];
            case 1:
                x = (_b[_a] = _c.sent(),
                    _b.c = 4,
                    _b);
                return [2 /*return*/];
        }
    });
}
function objectLiteral6() {
    var x;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {
                        a: 1
                    };
                return [4 /*yield*/];
            case 1:
                x = (_a[_b.sent()] = 2,
                    _a.c = 4,
                    _a);
                return [2 /*return*/];
        }
    });
}
function objectLiteral7() {
    var x, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = {
                        a: 1
                    };
                return [4 /*yield*/];
            case 1:
                _a = _c.sent();
                return [4 /*yield*/, 2];
            case 2:
                x = (_b[_a] = _c.sent(),
                    _b.c = 4,
                    _b);
                return [2 /*return*/];
        }
    });
}
