//// [tests/cases/compiler/es5-asyncFunctionTryStatements.ts] ////

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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 1, , 3]);
                    x;
                    return [3 /*break*/, 3];
                case 1:
                    e_2 = _a.sent();
                    return [4 /*yield*/, y];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function tryCatch3() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    return [2 /*return*/, function () { return e_3; }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function tryFinally0() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y;
        return __generator(this, function (_a) {
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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 2, 3]);
                    return [4 /*yield*/, x];
                case 1:
                    _a.sent();
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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 1, 3]);
                    x;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, y];
                case 2:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function tryCatchFinally0() {
    return __awaiter(this, void 0, void 0, function () {
        var x, y, z;
        return __generator(this, function (_a) {
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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, x];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2:
                    e_4 = _a.sent();
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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 1, 3, 4]);
                    x;
                    return [3 /*break*/, 4];
                case 1:
                    e_5 = _a.sent();
                    return [4 /*yield*/, y];
                case 2:
                    _a.sent();
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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 1, 2, 4]);
                    x;
                    return [3 /*break*/, 4];
                case 1:
                    e_6 = _a.sent();
                    y;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, z];
                case 3:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
