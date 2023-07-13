//// [tests/cases/compiler/es5-asyncFunctionSwitchStatements.ts] ////

//// [es5-asyncFunctionSwitchStatements.ts]
declare var x, y, z, a, b, c;

async function switchStatement0() {
    switch (x) {
        case y: a; break;
        default: b; break;
    }
}

async function switchStatement1() {
    switch (await x) {
        case y: a; break;
        default: b; break;
    }
}

async function switchStatement2() {
    switch (x) {
        case await y: a; break;
        default: b; break;
    }
}

async function switchStatement3() {
    switch (x) {
        case y: await a; break;
        default: b; break;
    }
}

async function switchStatement4() {
    switch (x) {
        case y: a; break;
        default: await b; break;
    }
}

async function switchStatement5() {
    switch (x) {
        case y: a; break;
        case await z: b; break;
    }
}

async function switchStatement6() {
    switch (x) {
        default: c; break;
        case await y: a; break;
        case z: b; break;
    }
}

async function switchStatement7() {
    switch (x) {
        default: c; break;
        case y: a; break;
        case await z: b; break;
    }
}

async function switchStatement8() {
    switch (x) {
        default: c;
        case y: a; break;
        case await z: b; break;
    }
}

//// [es5-asyncFunctionSwitchStatements.js]
function switchStatement0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (x) {
                case y:
                    a;
                    break;
                default:
                    b;
                    break;
            }
            return [2 /*return*/];
        });
    });
}
function switchStatement1() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, x];
                case 1:
                    switch (_a.sent()) {
                        case y:
                            a;
                            break;
                        default:
                            b;
                            break;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function switchStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, y];
                case 1:
                    switch (_a) {
                        case _b.sent(): return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    a;
                    return [3 /*break*/, 4];
                case 3:
                    b;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function switchStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    switch (_a) {
                        case y: return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, a];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    b;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function switchStatement4() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    switch (_a) {
                        case y: return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 2];
                case 1:
                    a;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, b];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function switchStatement5() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    switch (_a) {
                        case y: return [3 /*break*/, 2];
                    }
                    return [4 /*yield*/, z];
                case 1:
                    switch (_a) {
                        case _b.sent(): return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 4];
                case 2:
                    a;
                    return [3 /*break*/, 4];
                case 3:
                    b;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function switchStatement6() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    return [4 /*yield*/, y];
                case 1:
                    switch (_a) {
                        case _b.sent(): return [3 /*break*/, 3];
                        case z: return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 2];
                case 2:
                    c;
                    return [3 /*break*/, 5];
                case 3:
                    a;
                    return [3 /*break*/, 5];
                case 4:
                    b;
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function switchStatement7() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    switch (_a) {
                        case y: return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, z];
                case 1:
                    switch (_a) {
                        case _b.sent(): return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 2];
                case 2:
                    c;
                    return [3 /*break*/, 5];
                case 3:
                    a;
                    return [3 /*break*/, 5];
                case 4:
                    b;
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function switchStatement8() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = x;
                    switch (_a) {
                        case y: return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, z];
                case 1:
                    switch (_a) {
                        case _b.sent(): return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 2];
                case 2:
                    c;
                    _b.label = 3;
                case 3:
                    a;
                    return [3 /*break*/, 5];
                case 4:
                    b;
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
