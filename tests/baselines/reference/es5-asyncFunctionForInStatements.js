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
        var _a, _b, _i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [];
                    return [4 /*yield*/, y];
                case 1:
                    for (_b in _c.sent())
                        _a.push(_b);
                    _i = 0;
                    _c.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    x = _a[_i];
                    z;
                    _c.label = 3;
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
        var _a, _b, _i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [];
                    for (_b in y)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    x = _a[_i];
                    return [4 /*yield*/, z];
                case 2:
                    _c.sent();
                    _c.label = 3;
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
        var _a, _b, _i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [];
                    for (_b in y)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, x];
                case 2:
                    (_c.sent()).a = _a[_i];
                    z;
                    _c.label = 3;
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
        var _a, _b, _i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [];
                    return [4 /*yield*/, y];
                case 1:
                    for (_b in _c.sent())
                        _a.push(_b);
                    _i = 0;
                    _c.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    x.a = _a[_i];
                    z;
                    _c.label = 3;
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
        var _a, _b, _i;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [];
                    for (_b in y)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    x.a = _a[_i];
                    return [4 /*yield*/, z];
                case 2:
                    _c.sent();
                    _c.label = 3;
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
        var _a, _b, _i, b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [];
                    return [4 /*yield*/, y];
                case 1:
                    for (_b in _c.sent())
                        _a.push(_b);
                    _i = 0;
                    _c.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    b = _a[_i];
                    z;
                    _c.label = 3;
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
        var _a, _b, _i, c;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = [];
                    for (_b in y)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    c = _a[_i];
                    return [4 /*yield*/, z];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
