//// [es5-asyncFunctionTryStatements.ts]
declare var x: any, y: any, z: any, a: any, b: any, c: any;

async function tryCatch0() {
    var x: any, y: any;
    try {
        x;
    }
    catch (e) {
        y;
    }
}

async function tryCatch1() {
    var x: any, y: any;
    try {
        await x;
    }
    catch (e) {
        y;
    }
}

async function tryCatch2() {
    var x: any, y: any;
    try {
        x;
    }
    catch (e) {
        await y;
    }
}

async function tryCatch3(): Promise<Function> {
    var x: any, y: any;
    try {
        await x;
    }
    catch (e) {
        return () => e;
    }
}
async function tryFinally0() {
    var x: any, y: any;
    try {
        x;
    }
    finally {
        y;
    }
}

async function tryFinally1() {
    var x: any, y: any;
    try {
        await x;
    }
    finally {
        y;
    }
}

async function tryFinally2() {
    var x: any, y: any;
    try {
        x;
    }
    finally {
        await y;
    }
}

async function tryCatchFinally0() {
    var x: any, y: any, z: any;
    try {
        x;
    }
    catch (e) {
        y;
    }
    finally {
        z;
    }
}

async function tryCatchFinally1() {
    var x: any, y: any, z: any;
    try {
        await x;
    }
    catch (e) {
        y;
    }
    finally {
        z;
    }
}

async function tryCatchFinally2() {
    var x: any, y: any, z: any;
    try {
        x;
    }
    catch (e) {
        await y;
    }
    finally {
        z;
    }
}

async function tryCatchFinally3() {
    var x: any, y: any, z: any;
    try {
        x;
    }
    catch (e) {
        y;
    }
    finally {
        await z;
    }
}

//// [es5-asyncFunctionTryStatements.js]
function tryCatch0() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y;
        return __generator(this, function (_a) {
            try {
                x;
            }
            catch (e) {
                y;
            }
            return [2 /*return*/];
        });
    });
}
function tryCatch1() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, x];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    y;
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function tryCatch2() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 1, , 3]);
                    x;
                    return [3 /*break*/, 3];
                case 1:
                    e_2 = _c.sent();
                    return [4 /*yield*/, y];
                case 2:
                    _c.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function tryCatch3() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y, e_3;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, x];
                case 1:
                    _d.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _d.sent();
                    return [2 /*return*/, function () { return e_3; }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function tryFinally0() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y;
        return __generator(this, function (_e) {
            try {
                x;
            }
            finally {
                y;
            }
            return [2 /*return*/];
        });
    });
}
function tryFinally1() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, , 2, 3]);
                    return [4 /*yield*/, x];
                case 1:
                    _f.sent();
                    return [3 /*break*/, 3];
                case 2:
                    y;
                    return [7 /*endfinally*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function tryFinally2() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, , 1, 3]);
                    x;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, y];
                case 2:
                    _g.sent();
                    return [7 /*endfinally*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function tryCatchFinally0() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y, z;
        return __generator(this, function (_h) {
            try {
                x;
            }
            catch (e) {
                y;
            }
            finally {
                z;
            }
            return [2 /*return*/];
        });
    });
}
function tryCatchFinally1() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y, z, e_4;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _j.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, x];
                case 1:
                    _j.sent();
                    return [3 /*break*/, 4];
                case 2:
                    e_4 = _j.sent();
                    y;
                    return [3 /*break*/, 4];
                case 3:
                    z;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function tryCatchFinally2() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y, z, e_5;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    _k.trys.push([0, 1, 3, 4]);
                    x;
                    return [3 /*break*/, 4];
                case 1:
                    e_5 = _k.sent();
                    return [4 /*yield*/, y];
                case 2:
                    _k.sent();
                    return [3 /*break*/, 4];
                case 3:
                    z;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function tryCatchFinally3() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y, z, e_6;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    _l.trys.push([0, 1, 2, 4]);
                    x;
                    return [3 /*break*/, 4];
                case 1:
                    e_6 = _l.sent();
                    y;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, z];
                case 3:
                    _l.sent();
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
