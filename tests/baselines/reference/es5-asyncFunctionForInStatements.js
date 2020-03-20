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
        var _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _e = [];
                    for (_f in y)
                        _e.push(_f);
                    _g = 0;
                    _h.label = 1;
                case 1:
                    if (!(_g < _e.length)) return [3 /*break*/, 4];
                    x = _e[_g];
                    return [4 /*yield*/, z];
                case 2:
                    _h.sent();
                    _h.label = 3;
                case 3:
                    _g++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forInStatement3() {
    return __awaiter(this, void 0, void 0, function () {
        var _j, _k, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    _j = [];
                    for (_k in y)
                        _j.push(_k);
                    _l = 0;
                    _m.label = 1;
                case 1:
                    if (!(_l < _j.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, x];
                case 2:
                    (_m.sent()).a = _j[_l];
                    z;
                    _m.label = 3;
                case 3:
                    _l++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forInStatement4() {
    return __awaiter(this, void 0, void 0, function () {
        var _o, _p, _q;
        return __generator(this, function (_r) {
            switch (_r.label) {
                case 0:
                    _o = [];
                    return [4 /*yield*/, y];
                case 1:
                    for (_p in _r.sent())
                        _o.push(_p);
                    _q = 0;
                    _r.label = 2;
                case 2:
                    if (!(_q < _o.length)) return [3 /*break*/, 4];
                    x.a = _o[_q];
                    z;
                    _r.label = 3;
                case 3:
                    _q++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forInStatement5() {
    return __awaiter(this, void 0, void 0, function () {
        var _s, _t, _u;
        return __generator(this, function (_v) {
            switch (_v.label) {
                case 0:
                    _s = [];
                    for (_t in y)
                        _s.push(_t);
                    _u = 0;
                    _v.label = 1;
                case 1:
                    if (!(_u < _s.length)) return [3 /*break*/, 4];
                    x.a = _s[_u];
                    return [4 /*yield*/, z];
                case 2:
                    _v.sent();
                    _v.label = 3;
                case 3:
                    _u++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forInStatement6() {
    return __awaiter(this, void 0, void 0, function () {
        var a;
        return __generator(this, function (_w) {
            for (a in y) {
                z;
            }
            return [2 /*return*/];
        });
    });
}
function forInStatement7() {
    return __awaiter(this, void 0, void 0, function () {
        var _x, _y, _z, b;
        return __generator(this, function (_0) {
            switch (_0.label) {
                case 0:
                    _x = [];
                    return [4 /*yield*/, y];
                case 1:
                    for (_y in _0.sent())
                        _x.push(_y);
                    _z = 0;
                    _0.label = 2;
                case 2:
                    if (!(_z < _x.length)) return [3 /*break*/, 4];
                    b = _x[_z];
                    z;
                    _0.label = 3;
                case 3:
                    _z++;
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function forInStatement8() {
    return __awaiter(this, void 0, void 0, function () {
        var _1, _2, _3, c;
        return __generator(this, function (_4) {
            switch (_4.label) {
                case 0:
                    _1 = [];
                    for (_2 in y)
                        _1.push(_2);
                    _3 = 0;
                    _4.label = 1;
                case 1:
                    if (!(_3 < _1.length)) return [3 /*break*/, 4];
                    c = _1[_3];
                    return [4 /*yield*/, z];
                case 2:
                    _4.sent();
                    _4.label = 3;
                case 3:
                    _3++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
