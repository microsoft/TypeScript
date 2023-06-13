//// [tests/cases/compiler/es5-asyncFunctionForInStatements.ts] ////

//// [es5-asyncFunctionForInStatements.ts]
declare var x, y, z, a, b, c;

async function forInStatement0() {
    for (x in y) { z; }
}

async function forInStatement1() {
    for (x in await y) { z; }
}

async function forInStatement2() {
    for (x in y) { await z; }
}

async function forInStatement3() {
    for ((await x).a in y) { z; }
}

async function forInStatement4() {
    for (x.a in await y) { z; }
}

async function forInStatement5() {
    for (x.a in y) { await z; }
}

async function forInStatement6() {
    for (var a in y) { z; }
}

async function forInStatement7() {
    for (var b in await y) { z; }
}

async function forInStatement8() {
    for (var c in y) { await z; }
}

//// [es5-asyncFunctionForInStatements.js]
function forInStatement0() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            for (x in y) {
                z;
            }
            return [2 /*return*/];
        });
    });
}
function forInStatement1() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _i;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    _a = _d.sent();
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    x = _c;
                    z;
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forInStatement2() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _i;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = y;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    x = _c;
                    return [4 /*yield*/, z];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forInStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _i;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = y;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    return [4 /*yield*/, x];
                case 2:
                    (_d.sent()).a = _c;
                    z;
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forInStatement4() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _i;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    _a = _d.sent();
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    x.a = _c;
                    z;
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forInStatement5() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _i;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = y;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    x.a = _c;
                    return [4 /*yield*/, z];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forInStatement6() {
    return __awaiter(this, void 0, void 0, function () {
        var a;
        return __generator(this, function (_a) {
            for (a in y) {
                z;
            }
            return [2 /*return*/];
        });
    });
}
function forInStatement7() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _i, b;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, y];
                case 1:
                    _a = _d.sent();
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    b = _c;
                    z;
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forInStatement8() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _i, c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = y;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    c = _c;
                    return [4 /*yield*/, z];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
