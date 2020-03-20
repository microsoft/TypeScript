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
        var _b, _c, _i;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = [];
                    return [4 /*yield*/, y];
                case 1:
                    for (_c in _d.sent())
                        _b.push(_c);
                    _i = 0;
                    _d.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    x = _b[_i];
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
        var _e, _f, _i;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _e = [];
                    for (_f in y)
                        _e.push(_f);
                    _i = 0;
                    _g.label = 1;
                case 1:
                    if (!(_i < _e.length)) return [3 /*break*/, 4];
                    x = _e[_i];
                    return [4 /*yield*/, z];
                case 2:
                    _g.sent();
                    _g.label = 3;
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
        var _h, _j, _i;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    _h = [];
                    for (_j in y)
                        _h.push(_j);
                    _i = 0;
                    _k.label = 1;
                case 1:
                    if (!(_i < _h.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, x];
                case 2:
                    (_k.sent()).a = _h[_i];
                    z;
                    _k.label = 3;
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
        var _l, _m, _i;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    _l = [];
                    return [4 /*yield*/, y];
                case 1:
                    for (_m in _o.sent())
                        _l.push(_m);
                    _i = 0;
                    _o.label = 2;
                case 2:
                    if (!(_i < _l.length)) return [3 /*break*/, 4];
                    x.a = _l[_i];
                    z;
                    _o.label = 3;
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
        var _p, _q, _i;
        return __generator(this, function (_r) {
            switch (_r.label) {
                case 0:
                    _p = [];
                    for (_q in y)
                        _p.push(_q);
                    _i = 0;
                    _r.label = 1;
                case 1:
                    if (!(_i < _p.length)) return [3 /*break*/, 4];
                    x.a = _p[_i];
                    return [4 /*yield*/, z];
                case 2:
                    _r.sent();
                    _r.label = 3;
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
        return __generator(this, function (_s) {
            for (a in y) {
                z;
            }
            return [2 /*return*/];
        });
    });
}
function forInStatement7() {
    return __awaiter(this, void 0, void 0, function () {
        var _t, _u, _i, b;
        return __generator(this, function (_v) {
            switch (_v.label) {
                case 0:
                    _t = [];
                    return [4 /*yield*/, y];
                case 1:
                    for (_u in _v.sent())
                        _t.push(_u);
                    _i = 0;
                    _v.label = 2;
                case 2:
                    if (!(_i < _t.length)) return [3 /*break*/, 4];
                    b = _t[_i];
                    z;
                    _v.label = 3;
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
        var _w, _x, _i, c;
        return __generator(this, function (_y) {
            switch (_y.label) {
                case 0:
                    _w = [];
                    for (_x in y)
                        _w.push(_x);
                    _i = 0;
                    _y.label = 1;
                case 1:
                    if (!(_i < _w.length)) return [3 /*break*/, 4];
                    c = _w[_i];
                    return [4 /*yield*/, z];
                case 2:
                    _y.sent();
                    _y.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
